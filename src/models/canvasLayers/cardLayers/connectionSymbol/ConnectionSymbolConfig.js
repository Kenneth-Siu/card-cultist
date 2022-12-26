import { connectionSymbols, noConnectionSymbol } from "./connectionSymbols";
import CanvasTextConfig from "../../../CanvasTextConfig";

export default class ConnectionSymbolConfig extends CanvasTextConfig {
    constructor(connectionSymbolName) {
        super();
        this.symbol = connectionSymbols.find((o) => o.name === connectionSymbolName);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    isNone() {
        return this.symbol.name === noConnectionSymbol.name;
    }
}
