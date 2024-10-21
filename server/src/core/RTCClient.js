import DPI from "../utils/DPI";

class RTCClient {
  constructor() {
    this.#initClient();
  }

  /**
   * Initializes the RTC client by fetching settings and establishing a socket connection.
   * This is an asynchronous private method.
   *
   * @private
   * @async
   * @returns {Promise<void>} A promise that resolves when the client is initialized.
   */
  async #initClient() {
    const settings = await DPI.get("Settings").getSettings();
    this.client = this.getSocket(settings);
  }

  /**
   * Creates a new socket connection with the provided settings and handler.
   *
   * @param {Object} settings - The configuration settings for the socket connection.
   * @param {string} settings.url - The URL to which the socket should connect.
   * @param {Object} settings.options - Additional options for the socket connection.
   * @returns {Sockets} A new socket instance configured with the provided settings and handler.
   */
  getSocket(settings) {
    const handler = {
      serialize: (message) => JSON.stringify(message),
      validate: (event) => {
        if (typeof event?.data !== "string") {
          return this.#validationError(new Error("Invalid message type"));
        }
        try {
          const data = JSON.parse(event.data);
          if (DPI.get("Helpers").isServerMessageType(data)) {
            return this.#validationSuccess(data);
          }
          return this.#validationError(new Error("Invalid message type"));
        } catch (error) {
          return this.#validationError(new Error("Invalid JSON message"));
        }
      },
    };

    return new DPI.get("Sockets")(settings, handler);
  }

  /**
   * Generates a success response object with a given message.
   *
   * @private
   * @param {string} message - The success message to include in the response.
   * @returns {{ success: boolean, message: string }} An object indicating a successful validation with the provided message.
   */
  #validationSuccess(message) {
    return { success: true, message };
  }

  /**
   * Generates a validation error response.
   *
   * @private
   * @param {Error} error - The error object to be included in the response.
   * @returns {{ success: boolean, error: Error|string }} An object containing a success flag set to false and the provided error.
   */
  #validationError(error) {
    return { success: false, error };
  }

  /**
   * Asynchronously iterates over messages from the client.
   *
   * @generator
   * @async
   * @yields {Object} The next message from the client.
   */
  async *messages() {
    for await (const message of this.client) {
      yield message;
    }
  }

  /**
   * Sends a message using the client.
   *
   * @param {string} message - The message to be sent.
   * @returns {Promise<void>} A promise that resolves when the message is sent.
   */
  async send(message) {
    await this.client.send(message);
  }

  /**
   * Closes the RTC client connection.
   * This method asynchronously closes the connection of the RTC client.
   * @returns {Promise<void>} A promise that resolves when the client connection is closed.
   */
  async close() {
    await this.client.close();
  }
}

export default RTCClient;
