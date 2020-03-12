module.exports = class Landmark {
  /**
   *
   * @param {String} name
   * @param {Number[]} coordinates
   * @param {String} address
   * @param {String} url
   * @param {String} description
   */
  constructor(name, coordinates, address, url, description) {
    this.name = name;
    this.coordinates = coordinates;
    this.address = address;
    this.url = url;
    this.description = description;
    this.lng = coordinates && coordinates[0];
    this.lat = coordinates && coordinates[1];
  }
};
