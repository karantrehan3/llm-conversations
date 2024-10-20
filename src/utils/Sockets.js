const { WebSocket, MessageEvent, CloseEvent, ErrorEvent } = require("ws");

class Sockets {
  constructor() {
    this.socket = WebSocket;
    this.events = {
      message: MessageEvent,
      close: CloseEvent,
      error: ErrorEvent,
    };
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
      socket.send(message, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
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
    return new this.socket(settings.uri, settings.protocols, {
      headers: settings.headers,
    });
  }
}

module.exports = new Sockets();
