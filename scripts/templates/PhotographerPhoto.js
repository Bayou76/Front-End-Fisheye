class PhotographerPhoto {
  constructor(photo, idURL, namePhotographer) {
    this.photo = photo;
    this.idPage = idURL;
    this.namePhotographer = namePhotographer;
  }

  createPhotographerPortfolio() {
    if (this.photo.photographerId == this.idPage) {
      const $sectionList = document.querySelector(".list-media");
      const photoCard = `
      <br>
        <a href="#" aria-label="image">
          <img alt="${this.photo.title}" src="${this.photo.image}">
        </a>
        <div>
          <span class="titre-photo">${this.photo.title}</span>
        </div>
      `;

      $sectionList.insertAdjacentHTML("beforeend", photoCard);
      return $sectionList.lastChild;
    } else {
      return "";
    }
  }
}
