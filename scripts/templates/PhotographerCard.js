class photographerTemplate {
    constructor(photographer){
        this._photographer = photographer
    }

    creatPhotographerCard(){
        const $photographersSection = document.querySelector(".photographer_section");

        const photographerCard = `
            <article>
                <img
                    alt="${this._photographer.name}"
                    src="${this._photographer.portrait}"
                    aria-label="Photographer Portrait: ${this._photographer.name}"
                >
                <h2>${this._photographer.name}</h2>
                <h3>${this._photographer.city}, ${this._photographer.country}</h3>
                <p>${this._photographer.tagline}</p>
                <span>${this._photographer.price}$/jour</span>
            </article>
        `

        $photographersSection.insertAdjacentHTML('beforeend', photographerCard)
        return $photographersSection.lastChild
    }

}