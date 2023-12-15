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
      <figure>
        <a href="#" aria-label="image">
          <img alt="${this.photo.title}" src="${this.photo.image}">
        </a>
        <figcaption>${this.photo.title} </figcaption>
      </figure>
      `;

      $sectionList.insertAdjacentHTML("beforeend", photoCard);
      return $sectionList.lastChild;
    } else {
      return "";
    }
  }
}
