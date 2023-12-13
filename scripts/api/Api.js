class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    try {
      const response = await fetch(this._url);
      const data = await response.json();
      return data.photographers;
    } catch (err) {
      throw new Error(err);
    }
  }
}

class PhotographerApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getPhotographer() {
    return await this.get();
  }
}
