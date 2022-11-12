import CardFace from "../BlankFace/CardFace";
import ImageTransform from "../../../../models/ImageTransform";

export default class AgendaActFrontFace extends CardFace {
    constructor(face, type, frame) {
        super(face, type);
        if (!face) {
            face = {};
        }
        this.frame = frame;
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.number = face.number || "";
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.title = face.title || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.threshold = face.threshold || "";
        this.isPer = face.isPer || "";
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }
}
