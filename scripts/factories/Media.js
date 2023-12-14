class MediaFactory {
    constructor(media, idURL) {
        const namePhotographe = "";
        switch(idURL){
            case "243":
                namePhotographe = "Mimi";
                break;
            case "930":
                namePhotographe = "Ellie_Rose";
                break;
            case "82":
                namePhotographe = "Tracy";
                break
            case "527":
                namePhotographe = "Nabeel";
                break
            case "925":
                namePhotographe = "Rhode";
                break;
            case "195":
                namePhotographe = "Marcel";
                break;
        }
        return new Photo(media, namePhotographe);
    }
}