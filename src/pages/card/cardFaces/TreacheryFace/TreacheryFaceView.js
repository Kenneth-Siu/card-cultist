import React from "react";
import TreacheryFaceCanvas from "./TreacheryFaceCanvas";
import "../FaceView.scss";
import Container from "../../../../components/container/Container";
import Illustration from "../../components/illustration/Illustration";
import Expandable from "../../components/expandable/Expandable";

export default function TreacheryFaceView({ typeSelect, face, cardSet, campaign, setCampaign }) {
    return (
        <Container className="face-view">
            <TreacheryFaceCanvas
                face={face}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
            />
            <div className="form-container">
                {typeSelect}

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

                <Illustration
                    face={face}
                    campaign={campaign}
                    setCampaign={setCampaign}
                    setIllustrationTransform={setIllustrationTransform}
                />

                <Expandable maxHeight={"8rem"}>
                    <div className="input-container">
                        <label>Encounter Set Symbol</label>
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </div>

                    <div className="input-container">
                        <label>Card Type</label>
                        <input
                            type="text"
                            value={face.cardType}
                            onChange={(event) => setCardType(event.target.value)}
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
                </Expandable>
            </div>
        </Container>
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

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        setCampaign(campaign.clone());
    }
}
