
//use extends when inheriting another class file
//use implements when using interfaces

class ExamplePageClass {
  public param1: string = "test string"; // can be set outside class
  private _param2: string = "another test string"; // only available to class

  constructor() {}

  async getParam1() {
    return this.param1;
  }

  async getParam2() {
    return this._param2;
  }
}

export default new ExamplePageClass(); // calling new here, means when imported, won't need to new up the page object for use
