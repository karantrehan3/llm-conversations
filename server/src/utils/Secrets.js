import dotenv from "dotenv";

dotenv.config();

class Secrets {
  /**
   * Get secrets from environment variables
   * @param {String} key root key containing the secrets
   * @return {any} secret for the given key.
   */
  get(key) {
    if (process.env[key]) {
      return process.env[key];
    }
    const allSecrets = JSON.parse(process.env.SECRETS);
    return allSecrets[key];
  }
}

export default Secrets;
