import React from "react";
import "../FaceView.scss";
import "./_AgendaActBackFaceView.scss";

export default function AgendaActBackFaceView({ typeSelect, canvas, face, campaign, setCampaign }) {
    return (
        <div className="face-view agenda-act-back-face-view">
            {canvas}
            <div className="form-container">
                {typeSelect}

                <div className="input-container">
                    <label>Number</label>
                    <input type="text" value={face.number} onChange={(event) => setNumber(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Encounter Set Symbol</label>
                    <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                </div>

                <div className="input-container">
                    <label>Title</label>
                    <input type="text" value={face.title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Font Size</label>
                    <input
                        type="number"
                        value={face.textFontSize.toFixed(1)}
                        step="0.1"
                        min="1"
                        onChange={(event) => setTextFontSize(parseFloat(event.target.value))}
                    />
                </div>

                <div className="input-container">
                    <label>Header 1</label>
                    <input type="text" value={face.header1} onChange={(event) => setHeader1(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Story 1</label>
                    <textarea value={face.story1} onChange={(event) => setStory1(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Text 1</label>
                    <textarea value={face.text1} onChange={(event) => setText1(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Header 2</label>
                    <input type="text" value={face.header2} onChange={(event) => setHeader2(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Story 2</label>
                    <textarea value={face.story2} onChange={(event) => setStory2(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Text 2</label>
                    <textarea value={face.text2} onChange={(event) => setText2(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Header 3</label>
                    <input type="text" value={face.header3} onChange={(event) => setHeader3(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Story 3</label>
                    <textarea value={face.story3} onChange={(event) => setStory3(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Text 3</label>
                    <textarea value={face.text3} onChange={(event) => setText3(event.target.value)} />
                </div>
            </div>
        </div>
    );

    function setNumber(number) {
        face.number = number;
        setCampaign(campaign.clone());
    }

    function setTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function setHeader1(header1) {
        face.header1 = header1;
        setCampaign(campaign.clone());
    }

    function setHeader2(header2) {
        face.header2 = header2;
        setCampaign(campaign.clone());
    }

    function setHeader3(header3) {
        face.header3 = header3;
        setCampaign(campaign.clone());
    }

    function setStory1(story1) {
        face.story1 = story1;
        setCampaign(campaign.clone());
    }

    function setStory2(story2) {
        face.story2 = story2;
        setCampaign(campaign.clone());
    }

    function setStory3(story3) {
        face.story3 = story3;
        setCampaign(campaign.clone());
    }

    function setText1(text1) {
        face.text1 = text1;
        setCampaign(campaign.clone());
    }

    function setText2(text2) {
        face.text2 = text2;
        setCampaign(campaign.clone());
    }

    function setText3(text3) {
        face.text3 = text3;
        setCampaign(campaign.clone());
    }

    function setTextFontSize(fontSize) {
        face.textFontSize = fontSize;
        setCampaign(campaign.clone());
    }

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        setCampaign(campaign.clone());
    }
}
