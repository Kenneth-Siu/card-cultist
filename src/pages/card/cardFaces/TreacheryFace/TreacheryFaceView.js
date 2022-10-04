import React from "react";
import TreacheryFaceCanvas from "./TreacheryFaceCanvas";
import "../FaceView.scss";
import "./TreacheryFaceView.scss";

export default function TreacheryFaceView({ typeSelect, canvasRef, face, cardSet, campaign, setCampaign }) {

    return (
        <div className="face-view treachery-face-view">
            <TreacheryFaceCanvas
                face={face}
                cardSet={cardSet}
                campaign={campaign}
                canvasRef={canvasRef}
                setIllustrationTransform={setIllustrationTransform}
            />
            <div className="form-container">
                {typeSelect}

                <div className="input-container">
                    <label>Illustration</label>
                    <button onClick={() => setIllustration()}>Load Image</button>
                </div>

                <div className="input-container">
                    <label>X Position</label>
                    <input
                        type="number"
                        step="1"
                        value={face.illustrationTransform.x}
                        onChange={(event) => setIllustrationX(parseInt(event.target.value))}
                    />
                </div>
                <div className="input-container">
                    <label>Y Position</label>
                    <input
                        type="number"
                        step="1"
                        value={face.illustrationTransform.y}
                        onChange={(event) => setIllustrationY(parseInt(event.target.value))}
                    />
                </div>
                <div className="input-container">
                    <label>Scale</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={(face.illustrationTransform.scale * 100).toFixed(2)}
                        onChange={(event) => setIllustrationScale(parseFloat(event.target.value / 100))}
                    />
                </div>
                <div className="input-container">
                    <label>Rotation</label>
                    <input
                        type="number"
                        step="0.1"
                        value={face.illustrationTransform.rotation.toFixed(1)}
                        onChange={(event) => setIllustrationRotation(parseFloat(event.target.value))}
                    />
                </div>

                <div className="input-container">
                    <label>Encounter Set Symbol</label>
                    <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                </div>

                <div className="input-container">
                    <label>Card Type</label>
                    <input type="text" value={face.cardType} onChange={(event) => setCardType(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Title</label>
                    <input type="text" value={face.title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Traits</label>
                    <input type="text" value={face.traits} onChange={(event) => setTraits(event.target.value)} />
                </div>

                <div className="input-container">
                    <div className="text-label-container">
                        <label>Text</label>
                        <label className="font-size-label">
                            Font Size
                            <input
                                type="number"
                                value={face.textFontSize.toFixed(1)}
                                step="0.1"
                                min="1"
                                onChange={(event) => setTextFontSize(parseFloat(event.target.value))}
                            />
                        </label>
                    </div>
                    <textarea value={face.text} onChange={(event) => setText(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Illustrator</label>
                    <input
                        type="text"
                        value={face.illustrator}
                        onChange={(event) => setIllustrator(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Copyright Information</label>
                    <input
                        type="text"
                        value={face.copyrightInformation}
                        onChange={(event) => setCopyrightInformation(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Encounter Set ID</label>
                    <input
                        type="text"
                        value={face.encounterSetId}
                        onChange={(event) => setEncounterSetId(event.target.value)}
                    />
                    /
                    <input
                        type="text"
                        value={face.encounterSetMaxId}
                        onChange={(event) => setEncounterSetMaxId(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Campaign Symbol</label>
                    <button onClick={() => setCampaignSymbol()}>Load Image</button>
                </div>

                <div className="input-container">
                    <label>Campaign Set ID</label>
                    <input
                        type="text"
                        value={face.campaignSetId}
                        onChange={(event) => setCampaignSetId(event.target.value)}
                    />
                </div>
            </div>
        </div>
    );

    function setCardType(cardType) {
        face.cardType = cardType;
        setCampaign(campaign.clone());
    }

    function setTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function setTraits(traits) {
        face.traits = traits;
        setCampaign(campaign.clone());
    }

    function setText(text) {
        face.text = text;
        setCampaign(campaign.clone());
    }

    function setTextFontSize(fontSize) {
        face.textFontSize = fontSize;
        setCampaign(campaign.clone());
    }

    function setIllustrator(illustrator) {
        face.illustrator = illustrator;
        setCampaign(campaign.clone());
    }

    function setCopyrightInformation(copyrightInformation) {
        face.copyrightInformation = copyrightInformation;
        setCampaign(campaign.clone());
    }

    function setEncounterSetId(encounterSetId) {
        face.encounterSetId = encounterSetId;
        setCampaign(campaign.clone());
    }

    function setEncounterSetMaxId(encounterSetMaxId) {
        face.encounterSetMaxId = encounterSetMaxId;
        setCampaign(campaign.clone());
    }

    function setCampaignSetId(campaignSetId) {
        face.campaignSetId = campaignSetId;
        setCampaign(campaign.clone());
    }

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        setCampaign(campaign.clone());
    }

    async function setCampaignSymbol() {
        const path = await window.fs.chooseIcon();
        face.campaignSymbol = path;
        setCampaign(campaign.clone());
    }

    async function setIllustration() {
        const path = await window.fs.chooseImage();
        face.illustration = path;
        setCampaign(campaign.clone());
    }

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        setCampaign(campaign.clone());
    }

    function setIllustrationX(x) {
        setIllustrationTransform(face.illustrationTransform.withX(x));
    }

    function setIllustrationY(y) {
        setIllustrationTransform(face.illustrationTransform.withY(y));
    }

    function setIllustrationScale(scale) {
        setIllustrationTransform(face.illustrationTransform.withScale(scale));
    }

    function setIllustrationRotation(rotation) {
        setIllustrationTransform(face.illustrationTransform.withRotation(rotation));
    }
}
