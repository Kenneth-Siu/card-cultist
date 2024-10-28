import location from "../../../../../public/templates/locations/locationFrontCyber.png";
import locationSubtitle from "../../../../../public/templates/locations/locationSubtitleFrontCyber.png";
import LocationFrontFace from "../LocationFrontFace/LocationFrontFace";

export default class CyberspaceLocationFrontFace extends LocationFrontFace {
    static type = "Cyberspace Location Front";
    static frame = location;
    static frameSubtitle = locationSubtitle;

    constructor(face) {
        super(face, CyberspaceLocationFrontFace.type);
        this.frame = location;
        this.frameSubtitle = locationSubtitle;
    }
}
