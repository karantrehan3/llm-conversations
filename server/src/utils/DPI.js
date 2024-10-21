class DPI {
  constructor() {
    this.injector = {};
  }

  /*
   * @desciption: Inject a function to DPI
   * @param {String} name: Name of the module
   * @param {Object} resolverFn: resolverFn to be injected
   * @return {Void}
   */
  factory(name, resolverFn) {
    this.injector[name] = resolverFn();
  }

  /*
   * @desciption: Inject a module/ table to DPI
   * @param {String} name: Name of the module
   * @param {Object} module: Module to be injected
   * @return {Void}
   */
  module(name, module) {
    this.injector[name] = module;
  }

  /*
   * @desciption: Get the module/function from DPI
   * @param {String} name: Name of the module
   * @return {Object} module/function
   * @throws {Error} if module not found
   */
  get(name) {
    if (this.injector[name]) {
      return this.injector[name];
    }
    throw Error(`DPI: ${name} not found`);
  }
}

export default new DPI();
