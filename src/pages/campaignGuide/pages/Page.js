import remove from "lodash.remove";
import generateId from "../../../helpers/generateId";
import getWidgetClassInstance from "../widgets/getWidgetClassInstance";
import listOfWidgetTypes from "../widgets/listOfWidgetTypes";

export default class Page {
    static type = "None";
    static background = null;

    constructor(pageOrId, type, background) {
        this.type = type || Page.type;
        this.background = background || Page.background;
        const page = typeof pageOrId === "number" || !pageOrId ? {} : pageOrId;
        Object.assign(this, page);
        this.id = typeof pageOrId === "number" ? pageOrId : page.id;
        this.columnWidth = 489;
        this.leftColumnX = 64;
        this.rightColumnX = 572;
        this.y = 77;
        this.leftColumnWidgets = Array.isArray(page.leftColumnWidgets)
            ? page.leftColumnWidgets.map((widget) => getWidgetClassInstance(widget))
            : [];
        this.rightColumnWidgets = Array.isArray(page.rightColumnWidgets)
            ? page.rightColumnWidgets.map((widget) => getWidgetClassInstance(widget))
            : [];
    }

    addWidgetToLeftColumn(widgetType) {
        for (let i = 0; i < listOfWidgetTypes.length; i++) {
            if (listOfWidgetTypes[i].type === widgetType) {
                this.leftColumnWidgets.push(new listOfWidgetTypes[i](generateId(this.leftColumnWidgets)));
            }
        }
    }

    addWidgetToRightColumn(widgetType) {
        for (let i = 0; i < listOfWidgetTypes.length; i++) {
            if (listOfWidgetTypes[i].type === widgetType) {
                this.rightColumnWidgets.push(new listOfWidgetTypes[i](generateId(this.rightColumnWidgets)));
            }
        }
    }

    deleteWidget(widget) {
        remove(this.leftColumnWidgets, (w) => w === widget);
        remove(this.rightColumnWidgets, (w) => w === widget);
    }
}
