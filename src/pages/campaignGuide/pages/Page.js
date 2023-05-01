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
        this.leftColumnWidgets = Array.isArray(page.leftColumnWidgets)
            ? page.leftColumnWidgets.map((widget) => getWidgetClassInstance(widget))
            : [];
        this.rightColumnWidgets = Array.isArray(page.rightColumnWidgets)
            ? page.rightColumnWidgets.map((widget) => getWidgetClassInstance(widget))
            : [];
    }

    addWidgetToLeftColumn(widgetType, campaignGuide) {
        for (let i = 0; i < listOfWidgetTypes.length; i++) {
            if (listOfWidgetTypes[i].type === widgetType) {
                this.leftColumnWidgets.push(
                    new listOfWidgetTypes[i](generateId(this.leftColumnWidgets), campaignGuide)
                );
            }
        }
    }

    addWidgetToRightColumn(widgetType, campaignGuide) {
        for (let i = 0; i < listOfWidgetTypes.length; i++) {
            if (listOfWidgetTypes[i].type === widgetType) {
                this.rightColumnWidgets.push(
                    new listOfWidgetTypes[i](generateId(this.rightColumnWidgets), campaignGuide)
                );
            }
        }
    }

    deleteWidget(widget) {
        remove(this.leftColumnWidgets, (w) => w === widget);
        remove(this.rightColumnWidgets, (w) => w === widget);
    }

    swapWidgetUp(widget) {
        const leftColumnIndex = this.leftColumnWidgets.findIndex((leftWidget) => leftWidget === widget);
        if (leftColumnIndex > 0) {
            this.swapWidgets(this.leftColumnWidgets, leftColumnIndex - 1, leftColumnIndex);
            return;
        }
        const rightColumnIndex = this.rightColumnWidgets.findIndex((rightWidget) => rightWidget === widget);
        if (rightColumnIndex > 0) {
            this.swapWidgets(this.rightColumnWidgets, rightColumnIndex - 1, rightColumnIndex);
        }
    }

    swapWidgetDown(widget) {
        const leftColumnIndex = this.leftColumnWidgets.findIndex((leftWidget) => leftWidget === widget);
        if (leftColumnIndex > -1 && leftColumnIndex < this.leftColumnWidgets.length - 1) {
            this.swapWidgets(this.leftColumnWidgets, leftColumnIndex + 1, leftColumnIndex);
            return;
        }
        const rightColumnIndex = this.rightColumnWidgets.findIndex((rightWidget) => rightWidget === widget);
        if (rightColumnIndex > -1 && rightColumnIndex < this.rightColumnWidgets.length - 1) {
            this.swapWidgets(this.rightColumnWidgets, rightColumnIndex + 1, rightColumnIndex);
        }
    }

    swapWidgets(column, index1, index2) {
        [column[index1], column[index2]] = [column[index2], column[index1]];
    }
}
