import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import campaignGuideBackground from "../../../public/templates/campaignGuides/campaignGuideSquare.png";
import "./CampaignGuide.scss";

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

export default function CampaignGuide() {
    const canvasRef = useRef(null);
    const [loadedImages, setLoadedImages] = useState([]);

    return (
        <>
            <title>Card Cultist</title>
            <main className="campaign-guide-page">
                <Link to="/">Home</Link>
                <Link to="/treachery">Treachery</Link>
                <p>Campaign Guide here plz</p>
                <div>
                    <button
                        onClick={() => {
                            addImage(campaignGuideBackground);
                        }}
                    >
                        Add background
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
                    <button onClick={() => downloadPDF()}>Download PDF</button>
                </div>
                <canvas ref={canvasRef} id="preview" width="1125" height="1125"></canvas>
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
                    const context = canvasRef.current.getContext("2d");
                    context.drawImage(imageRef.current, 0, 0);
                }}
            />,
        ]);
    }

    function addTitle(text) {
        const context = canvasRef.current.getContext("2d");
        context.font = "46px Teutonic";
        context.textAlign = "center";
        context.fillText(text, 375, 652);
    }

    function addTextBox(text) {
        const context = canvasRef.current.getContext("2d");
        context.textAlign = "start";
        const lines = getLines(context, text, 650);
        context.font = "34px Mongolian Baiti";
        lines.forEach((line, lineNumber) => {
            let currentX = 62;
            for (let i = 0; i < line.length; i++) {
                if (symbolMapping[line[i]]) {
                    context.font = "34px AHCardTextSymbols";
                    context.fillText(symbolMapping[line[i]], currentX, 740 + lineNumber * 34);
                    currentX += context.measureText(symbolMapping[line[i]]).width;
                } else {
                    context.font = "34px Mongolian Baiti";
                    context.fillText(line[i], currentX, 740 + lineNumber * 34);
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

        context.font = "34px Mongolian Baiti";
        const spaceWidth = context.measureText(" ").width;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            let wordWidth = 0;
            if (symbolMapping[word]) {
                context.font = "34px AHCardTextSymbols";
                wordWidth = context.measureText(symbolMapping[word]).width;
            } else {
                context.font = "34px Mongolian Baiti";
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

    function downloadPDF() {
        const document = new jsPDF({
            unit: "px",
            hotfixes: ["px_scaling"],
            format: [1125, 1125],
        });
        document.addImage(canvasRef.current, "PNG", 0, 0, 1125, 1125)
        document.save("campaignGuide.pdf");
    }
}
