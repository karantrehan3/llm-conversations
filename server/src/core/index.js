/* eslint-disable */
const DPI = require("../utils/DPI");

const singletonInstances = ["Settings"];
const modules = ["Sockets"];

try {
  let Core;
  singletonInstances.forEach((name) => {
    Core = require(`./${name}`);
    DPI.factory(name, () => new Core());
  });
  modules.forEach((name) => {
    Core = require(`./${name}`);
    DPI.module(name, () => new Core());
  });
} catch (error) {
  console.error(error);
}
