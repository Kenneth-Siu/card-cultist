import CanvasTextConfig from "../../../CanvasTextConfig";

export default class ChaosTokenEffectsConfig extends CanvasTextConfig {
    constructor() {
        super();
        this.skullText = "";
        this.cultistText = "";
        this.tabletText = "";
        this.elderThingText = "";
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    withSkullText(skullText) {
        this.skullText = skullText;
        return this;
    }

    withCultistText(cultistText) {
        this.cultistText = cultistText;
        return this;
    }

    withTabletText(tabletText) {
        this.tabletText = tabletText;
        return this;
    }

    withElderThingText(elderThingText) {
        this.elderThingText = elderThingText;
        return this;
    }
}
