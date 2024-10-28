import location from "../../../../../public/templates/locations/locationBackCyber.png";
import locationSubtitle from "../../../../../public/templates/locations/locationSubtitleBackCyber.png";
import LocationBackFace from "../LocationBackFace/LocationBackFace";

export default class CyberspaceLocationBackFace extends LocationBackFace {
    static type = "Cyberspace Location Back";
    static frame = location;
    static frameSubtitle = locationSubtitle;

    constructor(face) {
        super(face, CyberspaceLocationBackFace.type);
        this.frame = location;
        this.frameSubtitle = locationSubtitle;
    }
}
