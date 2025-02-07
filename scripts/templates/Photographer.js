class PhotographeProfil {
	constructor(photographer, idURL) {
		this._photographer = photographer;
		this._idPage = idURL;
	}

	createPhotographeProfil() {
		if (this._idPage == this._photographer.id) {
			const $photographersHeader = document.querySelector(".photograph-header");
      
			const profilPhotographer = `              
                <div >
                  <h1>${this._photographer.name}</h1>
                  <p>${this._photographer.city} ${this._photographer.country}</p>
                  <br>
                  <span>${this._photographer.tagline}</span>
                </div>
                  <button tabindex="3" class="contact_button"  onclick="displayModal()">Contactez-moi</button>
              <div tabindex="10">
              <img class="profilPhotographrt" 
                alt="${this._photographer.name}"  
                src="${this._photographer.portrait}"
                aria-label="${this._photographer.name}"
              >
              </div>
          `;

			$photographersHeader.insertAdjacentHTML("beforeend", profilPhotographer);
			return $photographersHeader.lastChild;
		} else {
			return "";
		}
	}
}