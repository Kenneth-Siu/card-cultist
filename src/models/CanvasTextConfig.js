export default class CanvasTextConfig {
    constructor() {
        this.text = "";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.fontSize = 17;
        this.fontFamily = "Mongolian Baiti";
        this.align = "start";
    }

    withText(text) {
        this.text = text;
        return this;
    }

    withX(x) {
        this.x = x;
        return this;
    }

    withY(y) {
        this.y = y;
        return this;
    }

    withWidth(width) {
        this.width = width;
        return this;
    }

    withHeight(height) {
        this.height = height;
        return this;
    }

    withFontSize(fontSize) {
        this.fontSize = fontSize;
        return this;
    }

    withFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        return this;
    }

    withAlign(align) {
        this.align = align;
        return this;
    }
}
