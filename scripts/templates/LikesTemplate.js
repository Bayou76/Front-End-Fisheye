class LikeTemplateProfil {
  constructor(nbLikeTotal) {
    this._nbLikeTotal = nbLikeTotal;
  }

  LikeTemplate() {
    const $template = document.getElementById("like-tarif");

    let profilLikes = `
            <span id="likes"> ${this._nbLikeTotal} <i class="fa-solid fa-heart"></i> </span> 

        `;
    $template.insertAdjacentHTML("afterbegin", profilLikes);
    return $template.lastChild;
  }
}
