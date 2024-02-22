class App {
	constructor() {
		this.$photograppheSection = document.querySelector(".photographer_section");

		this.photographersApi = new PhotographerApi("/data/photographers.json");
	}

	async main() {
		const photographersData = await this.photographersApi.getPhotographerJSON();

		// console.log(photographersData);

		const Photographers = photographersData.map(
			(photographer) => new Photographer(photographer)
		);
		const FullPhotographers = Photographers;

		FullPhotographers.forEach((photographer) => {
			const Template = new photographerTemplate(photographer);
			this.$photograppheSection.appendChild(Template.createPhotographerCard());
		});
	}
}

const app = new App();
app.main();
