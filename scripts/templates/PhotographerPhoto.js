class PhotographerPhoto {
	static currentTabIndex = 14;
	constructor(photo, idURL, namePhotographer) {
		this.photo = photo;
		this.idPage = idURL;
		this._namePhotographer = namePhotographer;
	}

	createPhotographerPortfolio() {
		if (this.photo.photographerId == this.idPage) {
			const $sectionList = document.querySelector(".list-media");
			const photoCard = `
      <figure tabindex="${PhotographerPhoto.currentTabIndex++}" id="photo">
        <a href="#" role="button" aria-label="Ouvrir ${this.photo.title} dans la lightbox" onclick="openLightbox(this)">
          <img alt="illutration : ${this.photo.title}" src="assets/photographers/${this._namePhotographer}/${this.photo.image}">
        </a>
        <figcaption>
          <p> ${this.photo.title}</p> 
          <div class="like like-${this.photo.id}">
              <span id="like-${this.photo.id}">${this.photo.likes}</span>
              <span class="like-coeur" aria-label="Bouton j'aime pour ${this.photo.title}" role="button" tabindex="${PhotographerPhoto.currentTabIndex++}" ><i class="fa-solid fa-heart"></i></span>
          </div>
        </figcaption>
      </figure>
      `;

			$sectionList.insertAdjacentHTML("beforeend", photoCard);
			const newPhotoFigure = $sectionList.lastElementChild; 

			// Ajouter un écouteur d'événement pour gérer la touche 'Entrer'
			newPhotoFigure.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					openLightbox(newPhotoFigure);
				}
			});

			return newPhotoFigure;
		} else {
			return "";
		}
	}
}
