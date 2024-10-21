class Settings {
  /**
   * Generates settings for an API request.
   *
   * @param {URL} uri - The base URI for the API request.
   * @param {Object} credential - The credential object containing the API key.
   * @param {string} credential.key - The API key for authentication.
   * @param {Object} options - Additional options for the request.
   * @param {string} options.deployment - The deployment identifier.
   * @param {string} [options.requestId] - Optional request ID for tracking.
   * @returns {Object} The settings object for the API request.
   * @returns {URL} return.uri - The modified URI with query parameters and pathname.
   * @returns {Object} return.headers - The headers for the API request.
   * @returns {string} return.headers["User-Agent"] - The user agent string.
   * @returns {string} return.headers["x-ms-client-request-id"] - The client request ID.
   * @returns {Function} return.policy - The policy function to add the API key to headers.
   */
  getSettings(uri, credential, options) {
    uri.searchParams.set("api-version", DPI.get("Secrets").get("API_VERSION"));
    uri.searchParams.set("deployment", DPI.get("Secrets").get("DEPLOYMENT_ID"));
    uri.pathname = "openai/realtime";
    return {
      uri,
      headers: {
        "User-Agent": "ms-rtclient/PACKAGE_VERSION",
        "x-ms-client-request-id": options.requestId ?? crypto.randomUUID(),
      },
      policy: async (settings) => {
        settings.headers = {
          ...settings.headers,
          "api-key": DPI.get("Secrets").get("API_KEY"),
        };
        return settings;
      },
    };
  }
}

export { Settings };
