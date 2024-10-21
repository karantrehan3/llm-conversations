const DPI = require("../utils/DPI");
const SocketClient = require("./SocketClient");

export class LowLevelRTClient {
  constructor(uriOrCredential, credentialOrOptions, options) {
    const settings = (() => {
      if (
        isKeyCredential(uriOrCredential) &&
        isRTOpenAIOptions(credentialOrOptions)
      ) {
        return openAISettings(uriOrCredential, credentialOrOptions);
      } else if (
        isCredential(credentialOrOptions) &&
        isRTAzureOpenAIOptions(options)
      ) {
        return azureOpenAISettings(
          uriOrCredential,
          credentialOrOptions,
          options
        );
      } else {
        throw new Error(
          "Invalid combination of arguments to initialize the Realtime client"
        );
      }
    })();
    this.requestId = settings.requestId;
    this.client = this.getSocket(settings);
  }

  getSocket(settings) {
    const handler = {
      serialize: (message) => JSON.stringify(message),
      validate: (event) => {
        if (typeof event.data !== "string") {
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

    return new SocketClient(settings, handler);
  }

  #validationSuccess(message) {
    return { success: true, message };
  }

  #validationError(error) {
    return { success: false, error };
  }

  async *messages() {
    for await (const message of this.client) {
      yield message;
    }
  }

  async send(message) {
    await this.client.send(message);
  }

  async close() {
    await this.client.close();
  }
}
