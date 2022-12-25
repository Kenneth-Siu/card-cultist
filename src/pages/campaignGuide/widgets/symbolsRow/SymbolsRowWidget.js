import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import ImageTransform from "../../../../models/ImageTransform";
import Widget from "../Widget";
import SymbolsRowWidgetView from "./SymbolsRowWidgetView";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { SYMBOLS_ROW } from "../../campaignGuideConstants";

export default class SymbolsRowWidget extends Widget {
    static type = "Symbols Row";
    static dictionary = {};

    constructor(widgetOrId) {
        super(widgetOrId, SymbolsRowWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.paths = widget.paths || [];
        this.spacing = widget.spacing || 0;
    }

    getView(page) {
        return <SymbolsRowWidgetView key={this.id} widget={this} page={page} />;
    }

    draw(context, x, y, _isFirst, _campaignGuide, PAGE) {
        if (this.paths.length === 0) {
            return { y, w: 0 };
        }
        const totalWidth = this.paths.length * SYMBOLS_ROW.SYMBOL_SIZE + (this.paths.length - 1) * this.spacing;
        const startingX = x + (PAGE.COLUMN_WIDTH - totalWidth) / 2 + this.xNudge;

        this.paths.forEach((path, index) => {
            const image = SymbolsRowWidget.dictionary[path];
            if (!image) {
                return;
            }
            const transform = isSvgPath(path)
                ? transformSvgOnCanvas({ h: PAGE.HEIGHT, w: PAGE.WIDTH }, { h: image.height, w: image.width }, SYMBOLS_ROW.SYMBOL_SIZE)
                : null;

            const layer = new CanvasImageLayer(
                image,
                new ImageTransform()
                    .withX(startingX + index * (SYMBOLS_ROW.SYMBOL_SIZE + this.spacing) + (transform ? transform.xNudge : 0))
                    .withY(y + SYMBOLS_ROW.TOP_MARGIN + this.yNudge + (transform ? transform.yNudge : 0))
                    .withScale((transform && transform.scale) || SYMBOLS_ROW.SYMBOL_SIZE / Math.max(image.height, image.width))
            );
            layer.draw(context);
        });

        return {
            y: y + SYMBOLS_ROW.TOP_MARGIN + SYMBOLS_ROW.BOTTOM_MARGIN + this.yNudge + SYMBOLS_ROW.SYMBOL_SIZE,
            w: totalWidth,
        };
    }
}
