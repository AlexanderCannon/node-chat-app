module.exports = class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  getUserDescription() {
    return `${this.name} has an id of ${this.id}`
  }
}
