import React from "react";
import StoryFaceCanvas from "./StoryFaceCanvas";
import Container from "../../../../components/container/Container";
import "../FaceView.scss";
import Expandable from "../../components/expandable/Expandable";
import InputContainer from "../../components/inputContainer/InputContainer";

export default function StoryFaceView({ typeSelect, face, cardSet, campaign, setCampaign }) {
    return (
        <Container className="face-view">
            <StoryFaceCanvas face={face} cardSet={cardSet} />
            <div className="form-container">
                {typeSelect}

                <InputContainer label="Title" type="text" value={face.title} setValue={setTitle} />
                <InputContainer label="Font Size">
                    <input
                        type="number"
                        value={face.textFontSize.toFixed(1)}
                        step="0.1"
                        min="1"
                        onChange={(event) => setTextFontSize(parseFloat(event.target.value))}
                    />
                </InputContainer>
                <InputContainer label="Header 1" type="text" value={face.header1} setValue={setHeader1} />
                <InputContainer label="Story 1">
                    <textarea value={face.story1} onChange={(event) => setStory1(event.target.value)} />
                </InputContainer>
                <InputContainer label="Text 1">
                    <textarea value={face.text1} onChange={(event) => setText1(event.target.value)} />
                </InputContainer>
                <InputContainer label="Header 2" type="text" value={face.header2} setValue={setHeader2} />
                <InputContainer label="Story 2">
                    <textarea value={face.story2} onChange={(event) => setStory2(event.target.value)} />
                </InputContainer>
                <InputContainer label="Text 2">
                    <textarea value={face.text2} onChange={(event) => setText2(event.target.value)} />
                </InputContainer>
                <InputContainer label="Header 3" type="text" value={face.header3} setValue={setHeader3} />
                <InputContainer label="Story 3">
                    <textarea value={face.story3} onChange={(event) => setStory3(event.target.value)} />
                </InputContainer>
                <InputContainer label="Text 3">
                    <textarea value={face.text3} onChange={(event) => setText3(event.target.value)} />
                </InputContainer>

                <Expandable maxHeight={"3rem"}>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={setCardType} />
                </Expandable>
            </div>
        </Container>
    );

    function setTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
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

    function setCardType(cardType) {
        face.cardType = cardType;
        setCampaign(campaign.clone());
    }
}
