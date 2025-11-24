import location from "../../../../../public/templates/locations/locationFrontMeatCyber.png";
import locationSubtitle from "../../../../../public/templates/locations/locationSubtitleFrontMeatCyber.png";
import LocationFrontFace from "../LocationFrontFace/LocationFrontFace";

export default class MeatspaceCyberspaceLocationFrontFace extends LocationFrontFace {
    static type = "Meatspace/Cyberspace Location Front";
    static frame = location;
    static frameSubtitle = locationSubtitle;

    constructor(face) {
        super(face, MeatspaceCyberspaceLocationFrontFace.type);
        this.frame = location;
        this.frameSubtitle = locationSubtitle;
    }
}
