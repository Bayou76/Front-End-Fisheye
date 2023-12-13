class Photographer {
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._tagline = data.tagline;
    this._city = data.city;
    this._country = data.country;
    this._price = data.price;
    this._portrait = data.portrait;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get tagline() {
    return this._tagline;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get price() {
    return this._price;
  }

  get portrait() {
    return `assets/photographers/${this._portrait}`;
  }
}
