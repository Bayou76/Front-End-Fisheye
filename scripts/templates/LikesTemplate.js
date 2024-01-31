class LikeTemplateProfil {
  constructor(nbLikeTotal) {
    this._nbLikeTotal = nbLikeTotal;
  }

  LikeTemplate() {
    const $template = document.getElementById("like-tarif");

    let profilLikes = `
            <span id="likes">
              <span id="likes-count">${this._nbLikeTotal}</span>
              <i class="fa-solid fa-heart" aria-hidden="true"></i>
            </span>
        `;
    $template.insertAdjacentHTML("afterbegin", profilLikes);
    return $template.lastChild;
  }
}
