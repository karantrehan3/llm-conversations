import { WebSocket } from "ws";

class Sockets {
  #socket;
  #connectedPromise;
  #closedPromise;
  #error;
  #validate;
  #serialize;
  #messageQueue = [];
  #receiverQueue = [];
  #done = false;

  /**
   * Creates an instance of Sockets.
   *
   * @constructor
   * @param {Object} settings - The settings for the socket connection.
   * @param {Object} handler - The handler object containing validation and serialization methods.
   * @param {Function} handler.validate - The method to validate incoming messages.
   * @param {Function} handler.serialize - The method to serialize outgoing messages.
   * @private
   * @property {Function} #validate - The method to validate incoming messages.
   * @property {Function} #serialize - The method to serialize outgoing messages.
   * @property {Promise} #connectedPromise - A promise that resolves when the socket is successfully connected.
   * @property {WebSocket} #socket - The WebSocket instance.
   * @property {Promise} #closedPromise - A promise that resolves when the socket is closed.
   * @property {Error} #error - The error object if an error occurs during connection.
   */
  constructor(settings, handler) {
    this.#validate = handler.validate;
    this.#serialize = handler.serialize;
    this.#connectedPromise = new Promise(async (resolve, reject) => {
      try {
        this.#socket = await this.getSocket(settings);
        this.#socket.onopen = () => {
          this.#socket.onmessage = this.#getMessageHandler();
          this.#closedPromise = new Promise((resolve) => {
            this.#socket.onclose = this.#getClosedHandler(resolve);
          });
          this.#socket.onerror = this.#handleError.bind(this);
          resolve();
        };
        this.#socket.onerror = (event) => {
          this.#error = event.error;
          reject(event);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Establishes a new socket connection with the given settings.
   *
   * @param {Object} settings - The settings for the socket connection.
   * @param {string} settings.uri - The URI to connect to.
   * @param {Array<string>} [settings.protocols] - Optional protocols to use for the connection.
   * @param {Object} [settings.headers] - Optional headers to include in the connection request.
   * @param {Function} [settings.policy] - Optional policy function to modify settings before connection.
   * @returns {Promise<WebSocket>} A promise that resolves to the new WebSocket instance.
   */
  async getSocket(settings) {
    if (settings.policy != undefined) {
      settings = await settings.policy(settings);
    }
    return new WebSocket(settings.uri, settings.protocols, {
      headers: settings.headers,
    });
  }

  /**
   * Sends a message through the provided socket.
   *
   * @param {WebSocket} socket - The WebSocket through which the message will be sent.
   * @param {string|ArrayBufferLike|ArrayBufferView} message - The message to be sent.
   * @returns {Promise<void>} A promise that resolves when the message is successfully sent, or rejects with an error if the send fails.
   */
  sendMessage(socket, message) {
    return new Promise((resolve, reject) => {
      socket.send(message, (error) => (error ? reject(error) : resolve()));
    });
  }

  /**
   * Handles errors that occur during socket communication.
   *
   * @private
   * @param {Event} event - The error event containing the error details.
   */
  #handleError(event) {
    this.#error = event.error;
    while (this.#receiverQueue.length > 0) {
      const [_, reject] = this.#receiverQueue.shift();
      reject(event.error);
    }
  }

  /**
   * Creates a handler function for the 'close' event of a WebSocket.
   * This handler sets the internal done flag to true, processes any remaining
   * promises in the receiver queue, and resolves the close promise.
   *
   * @private
   * @param {Function} closeResolve - A function to resolve the promise that indicates the WebSocket has closed.
   * @returns {Function} A handler function for the 'close' event.
   */
  #getClosedHandler(closeResolve) {
    return (_event) => {
      this.#done = true;
      while (this.#receiverQueue.length > 0) {
        const [resolve, reject] = this.#receiverQueue.shift();
        if (this.#error) {
          reject(this.#error);
        } else {
          resolve({ value: undefined, done: true });
        }
      }
      closeResolve();
    };
  }

  /**
   * Returns a message handler function for processing incoming socket messages.
   *
   * The handler validates the incoming event and processes the message if valid.
   * If there are pending receivers in the queue, it resolves the oldest one with the message.
   * Otherwise, it pushes the message to the message queue.
   * If the message is invalid, it sets an error and closes the socket connection.
   *
   * @returns {Function} A function to handle incoming socket messages.
   */
  #getMessageHandler() {
    return (event) => {
      const result = this.#validate(event);
      if (result.isValid) {
        const { message } = result;
        if (this.#receiverQueue.length > 0) {
          const [resolve, _] = this.#receiverQueue.shift();
          resolve({ value: message, done: false });
        } else {
          this.#messageQueue.push(message);
        }
      } else {
        this.#error = result.error;
        this.#socket.close(1000, "Unexpected message received");
      }
    };
  }

  /**
   * Asynchronous iterator for the Sockets class.
   *
   * @returns {Object} An object with a `next` method that returns a Promise.
   * The `next` method resolves with an object containing the next message from the queue
   * or rejects with an error if one occurs.
   *
   * @method
   * @async
   * @generator
   *
   * @example
   * const Sockets = new Sockets();
   * for await (const message of Sockets) {
   *   console.log(message);
   * }
   */
  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.#error) {
          return Promise.reject(this.#error);
        } else if (this.#done) {
          return Promise.resolve({ value: undefined, done: true });
        } else if (this.#messageQueue.length > 0) {
          const message = this.#messageQueue.shift();
          return Promise.resolve({ value: message, done: false });
        } else {
          return new Promise((resolve, reject) => {
            this.#receiverQueue.push([resolve, reject]);
          });
        }
      },
    };
  }

  /**
   * Sends a message through the socket connection.
   *
   * @param {Object} message - The message to be sent.
   * @returns {Promise<void>} A promise that resolves when the message is sent.
   * @throws {Error} Throws an error if there is an issue with the connection.
   */
  async send(message) {
    await this.#connectedPromise;
    if (this.#error) {
      throw this.#error;
    }
    const serialized = this.#serialize(message);
    return this.sendMessage(this.#socket, serialized);
  }

  /**
   * Closes the socket connection.
   *
   * This method waits for the connection to be established before attempting to close it.
   * If the connection is already marked as done, it returns immediately.
   * Otherwise, it closes the socket and waits for the closure to be confirmed.
   *
   * @returns {Promise<void>} A promise that resolves when the socket is closed.
   */
  async close() {
    await this.#connectedPromise;
    if (this.#done) {
      return;
    }
    this.#socket.close();
    await this.#closedPromise;
  }
}

export default Sockets;
