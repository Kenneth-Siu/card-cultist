import React from "react";
import LocationBackFaceCanvas from "./LocationBackFaceCanvas";
import { connectionSymbols } from "../../../../models/canvasLayers/cardLayers/connectionSymbol/connectionSymbols";
import Container from "../../../../components/container/Container";
import "../FaceView.scss";
import Expandable from "../../components/expandable/Expandable";
import Illustration from "../../components/illustration/Illustration";
import ConnectionPicker from "../../components/connectionPicker/ConnectionPicker";

export default function LocationBackFaceView({ typeSelect, face, cardSet, campaign, setCampaign }) {
    return (
        <Container className="face-view">
            <LocationBackFaceCanvas
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
                    <label>Subtitle</label>
                    <input type="text" value={face.subtitle} onChange={(event) => setSubtitle(event.target.value)} />
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
                    <label className="v-centered">Connection Symbol</label>
                    <ConnectionPicker connection={face.connectionSymbol} setConnection={setConnectionSymbol} />
                </div>

                <div className="input-container">
                    <label className="v-centered">Connections</label>
                    <ConnectionPicker connection={face.connection1} setConnection={setConnection1} />
                    <ConnectionPicker connection={face.connection2} setConnection={setConnection2} />
                    <ConnectionPicker connection={face.connection3} setConnection={setConnection3} />
                    <ConnectionPicker connection={face.connection4} setConnection={setConnection4} />
                    <ConnectionPicker connection={face.connection5} setConnection={setConnection5} />
                    <ConnectionPicker connection={face.connection6} setConnection={setConnection6} />
                </div>

                <Illustration
                    face={face}
                    campaign={campaign}
                    setCampaign={setCampaign}
                    setIllustrationTransform={setIllustrationTransform}
                />

                <Expandable maxHeight={"6rem"}>
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
                        <label>Campaign Symbol</label>
                        <button onClick={() => setCampaignSymbol()}>Load Image</button>
                    </div>
                </Expandable>
            </div>
        </Container>
    );

    function setTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function setSubtitle(subtitle) {
        face.subtitle = subtitle;
        setCampaign(campaign.clone());
    }

    function setCardType(cardType) {
        face.cardType = cardType;
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

    function setConnectionSymbol(symbolName) {
        face.connectionSymbol = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection1(symbolName) {
        face.connection1 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection2(symbolName) {
        face.connection2 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection3(symbolName) {
        face.connection3 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection4(symbolName) {
        face.connection4 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection5(symbolName) {
        face.connection5 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection6(symbolName) {
        face.connection6 = symbolName;
        setCampaign(campaign.clone());
    }

    function setCopyrightInformation(copyrightInformation) {
        face.copyrightInformation = copyrightInformation;
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
