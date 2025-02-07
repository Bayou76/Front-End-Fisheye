class photographerTemplate {
	constructor(photographer) {
		this._photographer = photographer;
	}

	createPhotographerCard() {
		const $photographersSection = document.querySelector(
			".photographer_section"
		);

		const photographerCard = `
            <article tabindex="3" aria-label="${this._photographer.name}">
              <a href="photographer.html?id=${this._photographer.id}" aria-label="Lien vers le portfolio  ${this._photographer.name}">
                  <img
                      alt="${this._photographer.name}"
                      src="${this._photographer.portrait}"
                      aria-label="Photographer Portrait: ${this._photographer.name}"
                  >
              </a>
              <h2>${this._photographer.name}</h2>
              <h3>${this._photographer.city}, ${this._photographer.country}</h3>
              <p>${this._photographer.tagline}</p>
              <span>${this._photographer.price}$/jour</span>
            </article>
        `;

		$photographersSection.insertAdjacentHTML("beforeend", photographerCard);
		const cardElement = $photographersSection.lastChild;

		cardElement.addEventListener("keypress", (event) => {
			if (event.key === "Enter") {
				window.location.href = `photographer.html?id=${this._photographer.id}`;
			}
		});
		return cardElement;
	}
}
