import {
    connectionSymbols,
    noConnectionSymbol,
} from "../../../../pages/card/cardFaces/LocationFrontFace/connectionSymbols";
import CanvasTextConfig from "../../../CanvasTextConfig";

export default class ConnectionSymbolConfig extends CanvasTextConfig {
    constructor(connectionSymbolName) {
        super();
        this.symbol = connectionSymbols.find((o) => o.name === connectionSymbolName);
    }

    isNone() {
        return this.symbol.name === noConnectionSymbol.name;
    }
}
