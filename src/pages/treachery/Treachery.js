import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import treacheryFrame from "../../../public/cardFrames/treachery.png";
import testImage from "../../../public/alex rommel.jpg";
import "./Treachery.scss";

const textBoxText = "Revelation – Test wil (3). For each point you fail by, take 1 horror.";

export default function Treachery() {
    const canvas = useRef(null);
    // Stop having to manually update this every time canvas is updated
    const [dataURL, setDataURL] = useState(null);
    const [loadedImages, setLoadedImages] = useState([]);

    return (
        <>
            <title>Card Cultist</title>
            <main className="treachery-page">
                <Link to="/">Home</Link>
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
                    <a download="Rotting Remains" href={dataURL}>Download</a>
                </div>
                <canvas ref={canvas} id="preview" width="750" height="1050"></canvas>
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
                    setDataURL(canvas.current.toDataURL());
                }}
            />,
        ]);
    }

    function addTitle(text) {
        const context = canvas.current.getContext("2d");
        context.font = "46px Teutonic";
        context.textAlign = "center";
        context.fillText(text, 375, 652);
        setDataURL(canvas.current.toDataURL());
    }

    function addTextBox(text) {
        const context = canvas.current.getContext("2d");
        context.font = "34px serif";
        context.textAlign = "start";
        getLines(context, text, 650).forEach((line, lineNumber) => context.fillText(line, 62, 740 + lineNumber * 34));
        setDataURL(canvas.current.toDataURL());
    }

    // TODO get hyphens to work
    function getLines(context, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];

        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = context.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}
