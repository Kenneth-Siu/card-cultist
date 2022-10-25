import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "path";
import getBounds from "svg-path-bounds";

const ffgSetNames = [
    "scarlet",
    "edge",
    "innsmouth",
    "The Dream-Eaters",
    "The Circle Undone",
    "The Forgotten Age",
    "Standalone",
    "The Path to Carcosa",
    "Dunwich Legacy",
    "Arkham Encounter Core",
];

const output = JSON.parse(await readFile("./arkham icons.json", { encoding: "utf-8" }));

output.iconSets
    .filter((iconSet) => ffgSetNames.findIndex((ffgSetName) => iconSet.metadata.name === ffgSetName) != -1)
    .forEach(async (iconSet) => {
        const folderPath = path.join("./icons", iconSet.metadata.name);
        await makeFolder(folderPath);
        iconSet.icons.forEach(async (icon) => {
            addPadding(icon);
            await writeSvg(path.join(folderPath, `${icon.tags[0]}.svg`), icon);
        });
    });

async function makeFolder(folderName) {
    try {
        await mkdir(folderName);
    } catch (exception) {
        if (exception.code !== "EEXIST") {
            console.error(exception);
        }
    }
}

async function writeSvg(filePath, icon) {
    const box = icon.paths.slice(1).reduce((prev, iconPath) => {
        const newBounds = getBounds(iconPath);
        return [
            Math.min(prev[0], newBounds[0]),
            Math.min(prev[1], newBounds[1]),
            Math.max(prev[2], newBounds[2]),
            Math.max(prev[3], newBounds[3]),
        ];
    }, getBounds(icon.paths[0]));

    const left = box[0] - icon.padding;
    const top = box[1] - icon.padding;
    const right = box[2] + icon.padding;
    const bottom = box[3] + icon.padding;

    writeFile(
        filePath,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${left.toFixed(3)} ${top.toFixed(3)} ${(right - left).toFixed(
            3
        )} ${(bottom - top).toFixed(3)}">
${icon.paths
    .map(
        (iconPath) => `    <path fill="#000000" d="${iconPath}"></path>
`
    )
    .join("")}    </svg>`,
        { encoding: "utf-8" }
    );
}

function addPadding(icon) {
    if (icon.tags[0].startsWith("return_to") || icon.tags[0].startsWith("rt")) {
        icon.padding = 0;
    } else {
        icon.padding = 80;
    }
}
