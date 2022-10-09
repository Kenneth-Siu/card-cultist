import listOfWidgetTypes from "./listOfWidgetTypes";
import TextWidget from "./text/TextWidget";

export default function getWidgetClassInstance(widget) {
    if (!widget) {
        return new TextWidget(widget);
    }
    for (let i = 0; i < listOfWidgetTypes.length; i++) {
        if (listOfWidgetTypes[i].type === widget.type) {
            return new listOfWidgetTypes[i](widget);
        }
    }
    return new TextWidget(widget);
}
