import CanvasTextConfig from "../../../CanvasTextConfig";

export default class AgendaActBackSectionsConfig extends CanvasTextConfig {
    constructor() {
        super();
        this.header1 = "";
        this.story1 = "";
        this.text1 = "";
        this.header2 = "";
        this.story2 = "";
        this.text2 = "";
        this.header3 = "";
        this.story3 = "";
        this.text3 = "";
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    withHeader1(header1) {
        this.header1 = header1;
        return this;
    }

    withStory1(story1) {
        this.story1 = story1;
        return this;
    }

    withText1(text1) {
        this.text1 = text1;
        return this;
    }

    withHeader2(header2) {
        this.header2 = header2;
        return this;
    }

    withStory2(story2) {
        this.story2 = story2;
        return this;
    }

    withText2(text2) {
        this.text2 = text2;
        return this;
    }

    withHeader3(header3) {
        this.header3 = header3;
        return this;
    }

    withStory3(story3) {
        this.story3 = story3;
        return this;
    }

    withText3(text3) {
        this.text3 = text3;
        return this;
    }
}
