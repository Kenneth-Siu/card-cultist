import CanvasTextConfig from "../../../CanvasTextConfig";
import CanvasLayer from "../../CanvasLayer";
import CanvasTextLayer from "../../CanvasTextLayer";

export default class AgendaActBackSectionsLayer extends CanvasLayer {
    constructor(config) {
        super(config.x, config.y);
        this.config = config;
        this.header1 = config.header1;
        this.story1 = config.story1;
        this.text1 = config.text1;
        this.header2 = config.header2;
        this.story2 = config.story2;
        this.text2 = config.text2;
        this.header3 = config.header3;
        this.story3 = config.story3;
        this.text3 = config.text3;
    }

    draw(context) {
        const STORY_INDENT = Math.round(this.config.fontSize * 0.66);
        this.ACTUAL_LINE_HEIGHT = 0.57 * this.config.lineHeight;
        this.PADDING = Math.round(this.config.fontSize * 0.8);

        this.context = context;
        this.headerConfig = new CanvasTextConfig()
            .withX(this.config.x)
            .withWidth(this.config.width)
            .withFontSize(this.config.fontSize)
            .withLineHeight(this.config.lineHeight)
            .withBold();
        this.storyConfig = new CanvasTextConfig()
            .withX(this.config.x + STORY_INDENT)
            .withWidth(this.config.width - STORY_INDENT)
            .withFontSize(this.config.fontSize)
            .withLineHeight(this.config.lineHeight)
            .withItalic();
        this.textConfig = new CanvasTextConfig()
            .withX(this.config.x)
            .withWidth(this.config.width)
            .withFontSize(this.config.fontSize)
            .withLineHeight(this.config.lineHeight);

        let currentY = this.config.y;

        currentY = this.drawSection(currentY, this.header1, this.story1, this.text1, false);
        currentY = this.drawSection(currentY, this.header2, this.story2, this.text2, true);
        currentY = this.drawSection(currentY, this.header3, this.story3, this.text3, true);
    }

    drawSection(currentY, header, story, text, useSeparator) {
        if (useSeparator && (header || story || text)) {
            this.context.save();
            this.context.fillStyle = "black";
            this.context.fillRect(this.config.x, currentY + Math.round(this.config.fontSize * 0.7), this.config.width, 1);
            this.context.restore();
            currentY += 2 * Math.round(this.config.fontSize * 0.7) + 1;
        }
        if (header) {
            currentY = new CanvasTextLayer(this.headerConfig.withText(header).withY(currentY)).draw(this.context).y;
        }
        if (story) {
            if (header) {
                currentY += this.PADDING;
            }
            const startY = currentY;
            currentY = new CanvasTextLayer(this.storyConfig.withText(story).withY(currentY)).draw(this.context).y;

            this.context.save();
            this.context.fillStyle = "black";
            this.context.fillRect(this.config.x - 4, startY - 4, 2, currentY - startY + 4);
            this.context.fillRect(this.config.x + 2, startY - 4, 2, currentY - startY + 4);
            this.context.restore();
        }
        if (text) {
            if (header || story) {
                currentY += this.PADDING;
            }
            currentY = new CanvasTextLayer(this.textConfig.withText(text).withY(currentY)).draw(this.context).y;
        }
        return currentY;
    }
}
