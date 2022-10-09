import SquarePage from "./square/SquarePage";
import listOfPageTypes from "./listOfPageTypes";

export default function getPageClassInstance(page) {
    if (!page) {
        return new SquarePage(page);
    }
    for (let i = 0; i < listOfPageTypes.length; i++) {
        if (listOfPageTypes[i].type === page.type) {
            return new listOfPageTypes[i](page);
        }
    }
    return new SquarePage(page);
}
