class PhotographeProfil {
  constructor(photographer, idURL) {
    this._photographer = photographer;
    this._idPage = idURL;
  }

  createPhotographeProfil() {
    if (this._idPage == this._photographer.id) {
      const $photographersHeader = document.querySelector(".photograph-header");
      const profilPhotographer = `
              <img 
                alt="${this._photographer.name}"  
                src="${this._photographer.portrait}"
              >
              
              <div id="profil-photographe">
                <div>
                  <h1>${this._photographer.name}</h1>
                  <p>${this._photographer.city} ${this._photographer.country}</p>
                  <br>
                  <span>${this._photographer.tagline}</span>
                </div>
                  <button class="contact_button"  onclick="displayModal()">Contactez-moi</button>
              </div>
          `;

      $photographersHeader.insertAdjacentHTML("beforeend", profilPhotographer);
      return $photographersHeader.lastChild;
    } else {
      return "";
    }
  }
}