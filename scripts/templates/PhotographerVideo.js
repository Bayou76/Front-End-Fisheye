class PhotographerVideo {
	static currentTabIndex = 14;
	constructor(photo, idURL, namePhotographer) {
		this.photo = photo;
		this._idPage = idURL;
		this._namePhotographer = namePhotographer;
    
	}

	createPhotographerPortfolio() {
		if (`${this.photo.photographerId}` == this._idPage) {
			const $sectionList = document.querySelector(".list-media");

			const photoCard = `
            <figure tabindex="${PhotographerPhoto.currentTabIndex++}">
              <a href="#" aria-label="Voir la vidéo '${this.photo.title}'" onclick="openLightbox(this)">
                <video class="video" title="${this.photo.title}" controls>
                  <source src="assets/photographers/${this._namePhotographer}/${this.photo.video}" type="video/mp4">
                  <track src="path/to/subtitles/file.vtt" kind="subtitles" srclang="fr" label="Français">
                </video>
              </a>
              <figcaption>
                <p>${this.photo.title} </p>
                <div class="like like-${this.photo.id}">
                  <span id="like-${this.photo.id}">${this.photo.likes}</span>
                  <span class="like-coeur" aria-label="Bouton j'aime pour ${this.photo.title}" role="button" tabindex="${PhotographerPhoto.currentTabIndex++}"><i class="fa-solid fa-heart"></i></span>
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
