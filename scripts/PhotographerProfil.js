class App {
    constructor() {
      this.$photograppheHeader = document.querySelector(".photograph-header");
  
      this.photographersApi = new PhotographerApi("/data/photographers.json");
    }

    async main(){
        const idURL = new URL(window.location.href).searchParams.get("id");

        const photographersData = await this.photographersApi.get();
        const Photographe = photographersData.map(
            (photographe) => new ProfilPhotographeFactory(photographe, idURL));

        Photographe.forEach(
            (photographe) => {
            const ProfilTemplate = new PhotographeProfil(photographe, idURL);
            this.$photograppheHeader.append(ProfilTemplate.createPhotographeProfil());
        });
    }
}

const app = new App();
app.main();