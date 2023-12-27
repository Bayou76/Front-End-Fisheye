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
        <figcaption>
          <p>${this.photo.title}</p> 
          <span class="like like-${this.photo.id}">
                        <span id="like-${this.photo.id}">${this.photo.likes}</span>
                        <span class="like-coeur" aria-label="likes"></span>
                    </span>
        </figcaption>
      </figure>
      `;

      $sectionList.insertAdjacentHTML("beforeend", photoCard);
      return $sectionList.lastChild;
    } else {
      return "";
    }
  }
}
