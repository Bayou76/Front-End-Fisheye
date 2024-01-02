class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async getPhotographerJSON() {
    try {
      const response = await fetch(this._url);
      const data = await response.json();
      return data.photographers;
    } catch (err) {
      throw new err;
    }
  }

  async getMediaJSON(){
    try {
      const response = await fetch(this._url);
      const data = await response.json();
      return data.media;
    } catch (err) {
      throw new err;
    }
  }

  async getLikesJSON(){
    try {
      const response = await fetch(this._url);
      const data = await response.json();
      return data.media;
    } catch (err) {
      throw new err;
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
    return await this.getPhotographerJSON();
  }

  async getMedia(){
    return await this.getMediaJSON();
  }

  async getLikes(){
    return await this.getLikesJSON();
  }

}


