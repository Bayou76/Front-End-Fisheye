class MediaFactory {
  constructor(photo, idURL) {
    let nomPhotographe = "";
    switch (idURL) {
      case "243":
        nomPhotographe = "Mimi Kell";
        break;
      case "930":
        nomPhotographe = "Ellie-Rose Wilkens";
        break;
      case "82":
        nomPhotographe = "Tracy Galindo";
        break;
      case "527":
        nomPhotographe = "Nabeel Bradford";
        break;
      case "925":
        nomPhotographe = "Rhode Dubois";
        break;
      case "195":
        nomPhotographe = "Marcel Nikolic";
        break;
      default:
        break;
    }
    if ("image" in photo) {
      return new Photo(photo, nomPhotographe);
    } else {
      return new Video(photo, nomPhotographe);
    }
  }
}
