export default class Widget {
    static type = "None";

    constructor(widgetOrId, type) {
        this.type = type || Widget.type;
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        Object.assign(this, widget);
        this.id = typeof widgetOrId === "number" ? widgetOrId : widget.id;
        this.xNudge = widget.xNudge || 0;
        this.yNudge = widget.yNudge || 0;
    }
}
