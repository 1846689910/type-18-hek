const Fs = require("fs");

module.exports = class TextFileReader {
  /**
   *
   * @param {Object} options { encoding }
   */
  constructor(options = {}) {
    this.encoding = options.encoding || "utf8";
    this.path = options.path;
    /* this.text = undefined; */
  }

  /**
   * @param {String} path
   * @returns {TextFileReader}
   */
  read = (path) => {
    const p = path || this.path;
    this.text = Fs.readFileSync(p, { encoding: this.encoding });
    return this;
  };

  /**
   * @param {Object} defaultValue
   * @returns {Object}
   */
  toJson = (defaultValue) => {
    let json = defaultValue;
    try {
      json = JSON.parse(this.text);
    } catch (e) {
      console.error(e);
    }
    return json;
  };
};
