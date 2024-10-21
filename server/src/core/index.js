/* eslint-disable */
import DPI from "../utils/DPI";

const singletonInstances = ["Settings"];
const modules = ["Sockets"];

(async () => {
  try {
    let Core;
    for (const name of singletonInstances) {
      Core = await import(`./${name}`);
      DPI.factory(name, () => new Core());
    }
    for (const name of modules) {
      Core = await import(`./${name}`);
      DPI.module(name, () => new Core());
    }
  } catch (error) {
    console.error(error);
  }
})();
