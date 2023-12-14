class PhotographerVideo {
    constructor(photo, idURL, namePhotographer) {
      this.photo = photo;
      this._idPage = idURL;
      this._namePhotographer = namePhotographer;
    }
  
    createPhotographerPortfolio() {
      if (`${this.photo.photographerId}` == this._idPage) {
        const $sectionList = document.querySelector(".list-media");
  
        const photoCard = `
                  <a href="#" aria-label ="image">
                  <video title="$${this.photo.title}" controls >
                  <source src="${this.photo.image}" type="video/mp4" >
              </video>
                  </a>
              `;
  
        $sectionList.insertAdjacentHTML("beforeend", photoCard);
        return $sectionList.lastChild;
      } else {
        return "";
      }
    }
  }