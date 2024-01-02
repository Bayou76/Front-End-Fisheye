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
            <figure>
              <a href="#" aria-label ="image">
                <video class="video" title="$${this.photo.title}" controls >
                  <source src="${this.photo.video}" type="video/mp4" >
                </video>
              </a>
              <figcaption>
                <p>${this.photo.title} </p>
                <div class="like like-${this.photo.id}">
                  <span id="like-${this.photo.id}">${this.photo.likes}</span>
                  <span class="like-coeur" aria-label="likes"><i class="fa-solid fa-heart"></i></span>
                </div>
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
