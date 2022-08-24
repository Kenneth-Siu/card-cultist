import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import treacheryFrame from "../../../public/templates/treacheries/treachery.png";
import testImage from "../../../public/alex rommel.jpg";
import "./Treachery.scss";

const textBoxText = "Revelation – Test <wil> (3). For each point you fail by, take 1 horror.";

const symbolMapping = {
    "<guardian>": "a",
    "<gua>": "a",
    "<seeker>": "b",
    "<see>": "b",
    "<mystic>": "c",
    "<mys>": "c",
    "<rogue>": "d",
    "<rog>": "d",
    "<survivor>": "e",
    "<sur>": "e",
    "<willpower>": "f",
    "<wil>": "f",
    "<intellect>": "g",
    "<int>": "g",
    "<combat>": "h",
    "<com>": "h",
    "<agility>": "i",
    "<agi>": "i",
    "<wild>": "j",
};

export default function Treachery() {
    const canvas = useRef(null);
    const [loadedImages, setLoadedImages] = useState([]);

    return (
        <>
            <title>Card Cultist</title>
            <main className="treachery-page">
                <Link to="/">Home</Link>
                <Link to="/campaign-guide">Campaign Guide</Link>
                <p>Treachery here plz</p>
                <div>
                    <button
                        onClick={() => {
                            addImage(testImage);
                        }}
                    >
                        Add image
                    </button>
                    <button
                        onClick={() => {
                            addImage(treacheryFrame, 750, 1050);
                        }}
                    >
                        Add frame
                    </button>
                    <button
                        onClick={() => {
                            addTitle("Rotting Remains");
                        }}
                    >
                        Add title
                    </button>
                    <button
                        onClick={() => {
                            addTextBox(textBoxText);
                        }}
                    >
                        Add text box
                    </button>
                    <button onClick={() => downloadOne()}>Download one</button>
                    <button onClick={() => downloadAll()}>Download all</button>
                </div>
                <canvas ref={canvas} id="preview" width="375" height="525"></canvas>
                <div id="loaded-images">{loadedImages}</div>
            </main>
        </>
    );

    function addImage(src, width, height) {
        const imageRef = React.createRef();

        setLoadedImages((loadedImages) => [
            ...loadedImages,
            <img
                ref={imageRef}
                src={src}
                width={width !== undefined ? `${width}` : ""}
                height={height !== undefined ? `${height}` : ""}
                onLoad={() => {
                    const context = canvas.current.getContext("2d");
                    context.drawImage(imageRef.current, 0, 0);
                }}
            />,
        ]);
    }

    function addTitle(text) {
        const context = canvas.current.getContext("2d");
        context.font = "23px Teutonic";
        context.textAlign = "center";
        context.fillText(text, 187, 326);
    }

    function addTextBox(text) {
        const context = canvas.current.getContext("2d");
        context.textAlign = "start";
        const lines = getLines(context, text, 325);
        context.font = "17px Mongolian Baiti";
        lines.forEach((line, lineNumber) => {
            let currentX = 31;
            for (let i = 0; i < line.length; i++) {
                if (symbolMapping[line[i]]) {
                    context.font = "17px AHCardTextSymbols";
                    context.fillText(symbolMapping[line[i]], currentX, 370 + lineNumber * 17);
                    currentX += context.measureText(symbolMapping[line[i]]).width;
                } else {
                    context.font = "17px Mongolian Baiti";
                    context.fillText(line[i], currentX, 370 + lineNumber * 17);
                    currentX += context.measureText(line[i]).width;
                }
            }
        });
    }

    // If first word is too long, this breaks too
    // TODO get hyphens to work
    // TODO symbols when they're part of a larger word
    function getLines(context, text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = [];
        let currentWidth = 0;

        context.font = "17px Mongolian Baiti";
        const spaceWidth = context.measureText(" ").width;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            let wordWidth = 0;
            if (symbolMapping[word]) {
                context.font = "17px AHCardTextSymbols";
                wordWidth = context.measureText(symbolMapping[word]).width;
            } else {
                context.font = "17px Mongolian Baiti";
                wordWidth = context.measureText(word).width;
            }
            const newWidth = currentWidth + (i ? spaceWidth : 0) + wordWidth;
            if (newWidth < maxWidth) {
                if (i != 0) {
                    if (symbolMapping[word]) {
                        if (symbolMapping[currentLine[currentLine.length - 1]]) {
                            currentLine.push(" ");
                        } else {
                            currentLine[currentLine.length - 1] += " ";
                        }
                        currentLine.push(word);
                    } else {
                        if (symbolMapping[currentLine[currentLine.length - 1]]) {
                            currentLine.push(" ");
                        } else {
                            currentLine[currentLine.length - 1] += " ";
                        }
                        currentLine[currentLine.length - 1] += word;
                    }
                } else {
                    currentLine.push(word);
                }
                currentWidth = newWidth;
            } else {
                lines.push(currentLine);
                currentLine = [word];
                currentWidth = wordWidth;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    function downloadOne() {
        canvas.current.toBlob((canvasBlob) => {
            saveAs(canvasBlob, "Rotting Remains.png");
        });
    }

    function downloadAll() {
        const zip = new JSZip();
        const strikingFear = zip.folder("Striking Fear");
        const promise1 = new Promise((resolve, reject) => {
            canvas.current.toBlob((canvasBlob) => {
                resolve(canvasBlob);
            });
        });
        const promise2 = new Promise((resolve, reject) => {
            canvas.current.toBlob((canvasBlob) => {
                resolve(canvasBlob);
            });
        });
        Promise.all([promise1, promise2]).then(([canvasBlob1, canvasBlob2]) => {
            strikingFear.file("Rotting Remains.png", canvasBlob1);
            strikingFear.file("Rotting Remains2.png", canvasBlob2);
            zip.generateAsync({ type: "blob" }).then((zipBlob) => {
                saveAs(zipBlob, "Darkham Horror.zip");
            });
        });
    }
}
