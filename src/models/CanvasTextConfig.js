export const TEXTALIGN = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
};

export default class CanvasTextConfig {
    constructor() {
        this.text = "";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.fontSize = 34;
        this.fontFamily = "Amiri";
        this.align = TEXTALIGN.LEFT;
        this.bold = false;
        this.italic = false;
        this.color = "black";
        this.lineHeight = 1;
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

    withBold() {
        this.bold = true;
        return this;
    }

    withItalic() {
        this.italic = true;
        return this;
    }

    withColor(color) {
        this.color = color;
        return this;
    }

    withLineHeight(lineHeight) {
        this.lineHeight = lineHeight;
        return this;
    }
}
