class App {
  constructor() {
    this.$photograppheHeader = document.querySelector(".photograph-header");
    this.$sectionList = document.querySelector(".list-media");
    this.$like = document.getElementById("like-tarif");
    this.$tarif = document.getElementById("tarif");
    
    this.photographersApi = new PhotographerApi("/data/photographers.json");
  }

  async main() {
    const idURL = new URL(window.location.href).searchParams.get("id");
    // console.log(idURL);
    const namePhotographer = this.getNamePhotographer(idURL);

    // nom du dormulaire de contact

    document.querySelector(".nameContact").innerHTML = namePhotographer;

    // profil header
    const photographersData = await this.photographersApi.getPhotographer();
    const Photographe = photographersData.map(
      (photographe) => new ProfilPhotographeFactory(photographe, idURL)
    );

    Photographe.forEach((photographe) => {
      const ProfilTemplate = new PhotographeProfil(photographe, idURL);
      this.$photograppheHeader.append(ProfilTemplate.createPhotographeProfil());
      if (photographe.id == idURL){
        this.$tarif.append(`${photographe.price} € / jour`)
      }
    });

    // profil galeries
    
    const photosData = await this.photographersApi.getMedia();
    // console.log(photosData);
    const photo = photosData.map((photo) => new MediaFactory(photo, idURL));
    
    photo.forEach((photo) => {
        if("image" in photo){
            const PhotoTemplate = new PhotographerPhoto(photo, idURL, namePhotographer);
            this.$sectionList.append(PhotoTemplate.createPhotographerPortfolio());
        } else {
            const VideoTemplate = new PhotographerVideo(photo, idURL, namePhotographer);
            this.$sectionList.append(VideoTemplate.createPhotographerPortfolio());
        }
     
    });

    let Likes = await this.photographersApi.getLikes();
    console.log(Likes);
    let nbLikeTotal = 0;
        Likes.forEach(like => {
            if (like.photographerId == idURL) {
                nbLikeTotal += like.likes;
            }
            // console.log(nbLikeTotal);
        });
        let TemplateL = new LikeTemplateProfil(nbLikeTotal);
        this.$like.append(
          TemplateL.LikeTemplate()
        );
  }

  getNamePhotographer(idURL) {
    let namePhotographe = "";
    switch (idURL) {
      case "243":
        namePhotographe = "Mimi Kell";
        break;
      case "930":
        namePhotographe = "Ellie-Rose Wilkens";
        break;
      case "82":
        namePhotographe = "Tracy Galindo";
        break;
      case "527":
        namePhotographe = "Nabeel Bradford";
        break;
      case "925":
        namePhotographe = "Rhode Dubois";
        break;
      case "195":
        namePhotographe = "Marcel Nikolic";
        break;
      default:
        break;
    }
    return namePhotographe;
  }
}

const app = new App();
app.main();
