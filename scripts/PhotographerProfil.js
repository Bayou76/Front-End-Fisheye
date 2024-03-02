const getNamePhotographer = (idURL) => {
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
};

class App {
	constructor() {
		// Sélection des différents éléments dans la page
		this.$photograppheHeader = document.querySelector(".photograph-header");
		this.$sectionList = document.querySelector(".list-media");
		this.$like = document.getElementById("like-tarif");
		this.$tarif = document.getElementById("tarif");

		// Initialisation des données
		this.photosData = [];
		this.currentPhotographerId = null;
		this.namePhotographer = "";

		// Chargement des données des photographes depuis un fichier JSON
		this.photographersApi = new PhotographerApi("/data/photographers.json");
	}

	main = async () => {
		// Récupérer l'ID du photographe depuis l'URL
		const idURL = new URL(window.location.href).searchParams.get("id");
		// console.log(idURL);
		this.currentPhotographerId = parseInt(idURL);

		// Afficher le nom du photographe dans le formulaire de contact
		this.namePhotographer = getNamePhotographer(idURL);
		document.querySelector(".nameContact").innerHTML = this.namePhotographer;
		// Afficher les informations du photographe
		const photographersData = await this.photographersApi.getPhotographer();
		const Photographe = photographersData.map(
			(photographe) => new ProfilPhotographeFactory(photographe, idURL)
		);

		Photographe.forEach((photographe) => {
			const ProfilTemplate = new PhotographeProfil(photographe, idURL);
			this.$photograppheHeader.append(ProfilTemplate.createPhotographeProfil());
			if (photographe.id == idURL) {
				this.$tarif.append(`${photographe.price} € / jour`);
			}
		});

		// Afficher les médias du photographe
		this.photosData = await this.photographersApi.getMedia();
		this.sortMedia(this.photosData, "popularity");
		this.displayMedia(this.photosData, idURL, this.namePhotographer);

		let Likes = await this.photographersApi.getLikes();
		// console.log(Likes);
		let nbLikeTotal = 0;
		Likes.forEach((like) => {
			if (like.photographerId == idURL) {
				nbLikeTotal += like.likes;
			}
			// console.log(nbLikeTotal);
		});
		let TemplateL = new LikeTemplateProfil(nbLikeTotal);
		this.$like.append(TemplateL.LikeTemplate());

		document.querySelectorAll(".sortSelect").forEach((item) => {
			item.addEventListener("click", (event) => {
				// Récupérer la valeur de tri
				const sortby = event.target.getAttribute("value");

				// Appliquer le tri et mettre à jour l'affichage
				this.sortMedia(this.photosData, sortby);
				this.displayMedia(this.photosData, idURL, this.namePhotographer);
			});
		});
		this.gererLikes();
		this.addSortOptionListeners();
	};

	addSortOptionListeners = () => {
		document.querySelectorAll(".sortSelect").forEach((option) => {
			option.addEventListener("click", (event) => {
				this.changeSortOption(event);
			});
		});
	};

	changeSortOption = (event) => {
		const currentOption = event.currentTarget;
		const sortWrapper = currentOption.closest(".sort-wrapper");
		const currentText = currentOption.textContent.trim();
		const currentValue = currentOption.getAttribute("value");

		const firstOption = sortWrapper.querySelector(".sortSelect");
		const firstText = firstOption.textContent.trim();
		const firstValue = firstOption.getAttribute("value");

		currentOption.textContent = firstText;
		currentOption.setAttribute("value", firstValue);

		firstOption.textContent = currentText;
		firstOption.setAttribute("value", currentValue);

		const sortBy = firstOption.getAttribute("value");
		this.sortMedia(this.photosData, sortBy);
		this.displayMedia(
			this.photosData,
			this.currentPhotographerId,
			this.namePhotographer
		);
	};

	gererLikes = () => {
		document.querySelectorAll(".like-coeur").forEach((heart) => {
			heart.removeEventListener("click", this.toggleLike);
			heart.addEventListener("click", this.toggleLike);
			// Ajout d'un écouteur pour les événements clavier
			heart.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					this.toggleLike(event);
				}
			});
		});
	};

	toggleLike = (event) => {
		event.preventDefault(); // Empêche l'action par défaut
		event.stopPropagation(); // Empêche la propagation de l'événement

		const photoId = event.target.closest(".like").classList[1].split("-")[1];
		const photo = this.photosData.find((p) => p.id == photoId);
		if (photo) {
			photo.likes += photo.isLiked ? -1 : 1;
			photo.isLiked = !photo.isLiked;
			this.mettreAJourAffichage(photoId, photo.likes, photo.isLiked);
		}
	};

	mettreAJourAffichage = (photoId, likes, isLiked) => {
		const likeElement = document.getElementById(`like-${photoId}`);
		const heartElement = document.querySelector(
			`.like-coeur[data-id='${photoId}']`
		);
		if (likeElement) {
			likeElement.textContent = likes;
		}
		if (heartElement) {
			heartElement.classList.toggle("liked", isLiked);
		}
		let totalLikes = this.photosData
			.filter((photo) => photo.photographerId === this.currentPhotographerId)
			.reduce((acc, photo) => acc + photo.likes, 0);
		const totalLikesCountElement = document.getElementById("likes-count");
		if (totalLikesCountElement) {
			totalLikesCountElement.textContent = totalLikes;
		}
	};
	sortMedia = (list, sortby) => {
		switch (sortby) {
			case "popularity":
				list.sort((a, b) => b.likes - a.likes);
				break;
			case "date":
				list.sort((a, b) => new Date(b.date) - new Date(a.date));
				break;
			case "title":
				list.sort((a, b) => a.title.localeCompare(b.title));
				break;
		}
	};

	displayMedia = (list, idURL, namePhotographer) => {
		let $sectionList = document.querySelector(".list-media");
		$sectionList.innerHTML = "";

		list.forEach((media) => {
			// Vérifiez si le média est une image ou une vidéo et créez l'élément correspondant
			if ("image" in media) {
				const PhotoTemplate = new PhotographerPhoto(
					media,
					idURL,
					namePhotographer
				);
				$sectionList.append(PhotoTemplate.createPhotographerPortfolio());
			} else {
				const VideoTemplate = new PhotographerVideo(
					media,
					idURL,
					namePhotographer
				);
				$sectionList.append(VideoTemplate.createPhotographerPortfolio());
			}
		});

		// Réappliquez l'état des likes et reconfigurez les gestionnaires d'événements
		this.gererLikes();
		list.forEach((media) => {
			this.mettreAJourAffichage(media.id, media.likes, media.isLiked);
		});
	};
}

const app = new App();
app.main();

let currentImageIndex = 0;
let images = [];

const openLightbox = (element) => {
	const lightbox = document.getElementById("lightbox");
	images = Array.from(document.querySelectorAll(".list-media img"));
	currentImageIndex = images.indexOf(element.querySelector("img"));

	updateLightbox(currentImageIndex);
	lightbox.style.display = "block";
};

document.getElementById("fleche-gauche").addEventListener("click", () => {
	currentImageIndex--;
	if (currentImageIndex < 0) {
		currentImageIndex = images.length - 1;
	}
	updateLightbox(currentImageIndex);
});

document.getElementById("fleche-droite").addEventListener("click", () => {
	currentImageIndex++;
	if (currentImageIndex >= images.length) {
		currentImageIndex = 0;
	}
	updateLightbox(currentImageIndex);
});

document.addEventListener("keydown", (event) => {
	if (document.getElementById("lightbox").style.display === "block") {
		switch (event.key) {
			case "ArrowRight":
				navigateLightbox("next");
				break;
			case "ArrowLeft":
				navigateLightbox("previous");
				break;
			case "Escape":
				closeLightbox();
				break;
		}
	}
});

const navigateLightbox = (direction) => {
	if (direction === "next") {
		currentImageIndex++;
		if (currentImageIndex >= images.length) {
			currentImageIndex = 0;
		}
	} else if (direction === "previous") {
		currentImageIndex--;
		if (currentImageIndex < 0) {
			currentImageIndex = images.length - 1;
		}
	}
	updateLightbox(currentImageIndex);
};

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeLightbox();
	}
});

const updateLightbox = (index) => {
	const image = images[index];

	if (!image) {
		console.error("Aucune image trouvée à l'index", index);
		return;
	}

	document.getElementById(
		"contenu-photo-lightbox"
	).innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
	document.getElementById("titre-photo-lightbox").innerText = image.alt;
};

const closeLightbox = () => {
	const lightbox = document.getElementById("lightbox");
	if (lightbox.style.display === "block") {
		lightbox.style.display = "none";
	}
};
