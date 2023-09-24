export const TEXTALIGN = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
};

export const VERTICAL_TEXTALIGN = {
    TOP: "top",
    BOTTOM: "BOTTOM",
};

export const UNDERLINE = {
    NONE: "none",
    SINGLE: "single",
    DOUBLE: "double",
};

export const TEXTDIRECTION = {
    RIGHT: "right",
    UP: "up",
};

export default class CanvasTextConfig {
    constructor() {
        this.text = "";
        this._x = 0;
        this.y = 0;
        this._width = 0;
        this.height = 0;
        this.fontSize = 34;
        this.fontFamily = "Arno Pro";
        this.align = TEXTALIGN.LEFT;
        this.verticalAlign = VERTICAL_TEXTALIGN.TOP;
        this.bold = false;
        this.italic = false;
        this.color = "black";
        this.lineHeight = 1;
        this.cardTitle = "";
        this.cardSubtitle = "";
        this.highlightColor = "";
        this.underline = UNDERLINE.NONE;
        this.strokeStyle = "black";
        this.strokeWidth = 0;
        this.textDirection = TEXTDIRECTION.RIGHT;
    }

    get x() {
        return (dy) => (typeof this._x === "function" ? this._x(dy) : this._x);
    }

    set x(value) {
        this._x = value;
    }

    get width() {
        return (dy) => (typeof this._width === "function" ? this._width(dy) : this._width);
    }

    set width(value) {
        this._width = value;
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

    withVerticalAlign(verticalAlign) {
        this.verticalAlign = verticalAlign;
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

    withCardTitle(cardTitle) {
        this.cardTitle = cardTitle;
        return this;
    }

    withCardSubtitle(cardSubtitle) {
        this.cardSubtitle = cardSubtitle;
        return this;
    }

    withHighlightColor(highlightColor) {
        this.highlightColor = highlightColor;
        return this;
    }

    withUnderline(underline) {
        this.underline = underline;
        return this;
    }

    withStrokeStyle(strokeStyle) {
        this.strokeStyle = strokeStyle;
        return this;
    }

    withStrokeWidth(strokeWidth) {
        this.strokeWidth = strokeWidth;
        return this;
    }

    withTextDirection(textDirection) {
        this.textDirection = textDirection;
        return this;
    }
}
