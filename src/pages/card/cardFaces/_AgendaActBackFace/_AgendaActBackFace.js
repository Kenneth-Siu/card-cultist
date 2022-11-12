import CardFace from "../BlankFace/CardFace";

export default class AgendaActBackFace extends CardFace {
    constructor(face, type, frame) {
        super(face, type);
        if (!face) {
            face = {};
        }
        this.frame = frame;
        this.number = face.number || "";
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.title = face.title || "";
        this.textFontSize = face.textFontSize || 30;
        this.header1 = face.header1 || "";
        this.story1 = face.story1 || "";
        this.text1 = face.text1 || "";
        this.header2 = face.header2 || "";
        this.story2 = face.story2 || "";
        this.text2 = face.text2 || "";
        this.header3 = face.header3 || "";
        this.story3 = face.story3 || "";
        this.text3 = face.text3 || "";
    }
}
