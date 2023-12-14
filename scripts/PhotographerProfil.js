class App {
  constructor() {
    this.$photograppheHeader = document.querySelector(".photograph-header");
    this.$sectionList = document.querySelector(".list-media");

    
    this.photographersApi = new PhotographerApi("/data/photographers.json");
  }

  async main() {
    const idURL = new URL(window.location.href).searchParams.get("id");
    // console.log(idURL);
    const namePhotographer = this.getNamePhotographer(idURL);

    // profil header
    const photographersData = await this.photographersApi.getPhotographer();
    const Photographe = photographersData.map(
      (photographe) => new ProfilPhotographeFactory(photographe, idURL)
    );

    Photographe.forEach((photographe) => {
      const ProfilTemplate = new PhotographeProfil(photographe, idURL);
      this.$photograppheHeader.append(ProfilTemplate.createPhotographeProfil());
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
  }

  getNamePhotographer(idURL) {
    let namePhotographe = "";
    switch (idURL) {
      case "243":
        namePhotographe = "Mimi";
        break;
      case "930":
        namePhotographe = "Ellie Rose";
        break;
      case "82":
        namePhotographe = "Tracy";
        break;
      case "527":
        namePhotographe = "Nabeel";
        break;
      case "925":
        namePhotographe = "Rhode";
        break;
      case "195":
        namePhotographe = "Marcel";
        break;
      default:
        break;
    }
    return namePhotographe;
  }
}

const app = new App();
app.main();
