/* eslint-disable */
import DPI from "./DPI";

const list = ["Secrets", "Helpers"];

(async () => {
  try {
    let Util;
    for (const name of list) {
      Util = await import(`./${name}`);
      DPI.factory(name, () => new Util());
    }
  } catch (error) {
    console.error(error);
  }
})();
