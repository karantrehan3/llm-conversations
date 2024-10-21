/* eslint-disable */
import DPI from "./DPI";

const list = ["Secrets", "Helpers"];

try {
  let Util;
  list.forEach((name) => {
    Util = require(`./${name}`);
    DPI.factory(name, () => new Util());
  });
} catch (error) {
  console.error(error);
}
