class Settings {
  /**
   * Generates settings for an API request.
   *
   * @returns {Object} The settings object for the API request.
   */
  getSettings() {
    const uri =
      `wss://${DPI.get("Secrets").get("AZURE_RESOURCE_ENDPOINT")}` +
      "/openai/realtime" +
      `?api-version=${DPI.get("Secrets").get("AZURE_API_VERSION")}` +
      `&deployment=${DPI.get("Secrets").get("AZURE_DEPLOYMENT_ID")}`;
    return {
      uri,
      headers: {
        "User-Agent": "ms-rtclient/PACKAGE_VERSION",
        "x-ms-client-request-id": crypto.randomUUID(),
      },
      policy: async (settings) => {
        settings.headers = {
          ...settings.headers,
          "api-key": DPI.get("Secrets").get("AZURE_API_KEY"),
        };
        return settings;
      },
    };
  }
}

module.exports = new Settings();
