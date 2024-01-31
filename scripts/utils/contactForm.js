// Ouverture et Fermeture de la modale

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
let lastFocusElement ;

function displayModal() {
  lastFocusElement = document.activeElement;
  modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false');
  closeBtn.focus();
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
  if(lastFocusElement){
    lastFocusElement.focus();
  }
}

document.body.addEventListener("keydown", e => {
  if (modal.getAttribute('aria-hidden') === 'false' && e.key === "Escape") {
    closeModal();
  }
});

closeBtn.addEventListener("click", closeModal);

// Condition de validation des input

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// fonction pour les champs nom  et prénom

function validatedName(name, nameError) {
  if (/^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/.test(name.value)) {
    name.style.border = "solid 2px green";
    name.style.backgroundColor = "white";
    name.style.color = "black";
    nameError.textContent = "Champ Valide";
    nameError.style.color = "green";
    nameError.style.fontSize = "15px";
    return true;
  } else {
    name.style.border = "solid 2px darkred";
    name.style.backgroundColor = "#901C1C";
    name.style.color = "white";
    nameError.textContent = "Veuillez entrer 2 caractères ou plus";
    nameError.style.color = "red";
    nameError.style.fontSize = "12px";
    return false;
  }
}

firstName.addEventListener("change", () => {
  validatedName(firstName, firstNameError);
});
lastName.addEventListener("change", () => {
  validatedName(lastName, lastNameError);
});

// fonction pour le champ email

function emailValidated() {
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email.value
    )
  ) {
    email.style.border = "solid 2px green";
    email.style.backgroundColor = "white";
    email.style.color = "black";
    emailError.textContent = "Champ Valide";
    emailError.style.fontSize = "15px";
    emailError.style.color = "green";
    return true;
  } else {
    email.style.border = "solid 2px darkred";
    email.style.backgroundColor = "#901C1C";
    email.style.color = "white";
    emailError.textContent = "Veuillez rentrer une adresse email valide";
    emailError.style.fontSize = "15px";
    emailError.style.color = "red";
    return false;
  }
}
email.addEventListener("change", () => {
  emailValidated();
});

//  Fonction pour le champ texte

function validatedMessage() {
  if (/^.{10,180}$/.test(message.value)) {
    message.style.border = "solid 2px green";
    message.style.backgroundColor = "white";
    message.style.color = "black";
    messageError.textContent = "Champ Valide";
    messageError.style.color = "green";
    messageError.style.fontSize = "15px";
    return true;
  } else {
    message.style.border = "solid 2px darkred";
    messageError.textContent = "Veuillez entrer 2 caractères ou plus";
    messageError.style.color = "red";
    messageError.style.fontSize = "12px";
    return false;
  }
}

message.addEventListener("change", () => {
  validatedMessage();
});

// message de validation

const btnSend = document.querySelector(".btn-submit");
const btnCloseConfirm = document.querySelector(".btnClose");
const modalConfirmation = document.querySelector(".modalConfirmation");
const form = document.querySelector("form");
const formError = document.getElementById("formError");

btnSend.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    validatedName(firstName, firstNameError) &&
    validatedName(lastName, lastNameError) &&
    emailValidated() &&
    validatedMessage()
  ) {
    modalConfirmation.style.display = "block";
    form.style.display = "none";
    console.log("Prénom: " + firstName.value);
    console.log("Nom: " + lastName.value);
    console.log("Adresse mail: " + email.value);
    console.log("Message: " + message.value);
  } else {
    formError.textContent = " Merci de bien remplir le formulaire de contact";
    formError.style.fontSize = "15px";
    formError.style.color = "red";
  }
});

btnCloseConfirm.addEventListener("click", () => {
  modal.style.display = "none";
  modalConfirmation.style.display = "none";

  firstName.value = "";
  lastName.value = "";
  email.value = "";
  message.value = "";

  resetError(firstName, firstNameError);
  resetError(lastName, lastNameError);
  resetError(email, emailError);
  resetError(message, messageError);
  form.style.display = "block";
});

function resetError(style, error) {
  style.style.border = "";
  style.style.backgroundColor = "";
  style.style.color = "";
  error.textContent = "";
}
