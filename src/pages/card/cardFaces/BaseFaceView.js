import React from "react";
import Container from "../../../components/container/Container";
import getCardFaceClassInstance from "../../../helpers/getCardFaceClassInstance";
import InputContainer from "../components/inputContainer/InputContainer";
import Expandable from "../components/expandable/Expandable";
import "./FaceView.scss";
import { FACE_DIRECTION } from "../cardConstants";
import IconButton from "../../../components/iconButton/IconButton";

export default function BaseFaceView({
    faceDirection,
    listOfCardFaces,
    face,
    otherFace,
    canvas,
    fields,
    expandableHeight,
    expandableFields,
    campaign,
    setCampaign,
}) {
    return (
        <Container className="face-view">
            <div className="header">
                <h2>— {faceDirection === FACE_DIRECTION.FRONT ? "Front" : "Back"} Face —</h2>
                {face.autofill ? (
                    <IconButton onClick={autofill}>
                        Autofill
                        <span className="emoji">{faceDirection === FACE_DIRECTION.FRONT ? "⬆" : "⬇"}</span>
                    </IconButton>
                ) : null}
            </div>
            {canvas}
            <div className="form-container">
                <InputContainer label="Card Face">
                    <select value={face.type} onChange={(event) => setFaceType(event.target.value)}>
                        {listOfCardFaces.map((cardFace) => (
                            <option key={cardFace.type} value={cardFace.type}>
                                {cardFace.type}
                            </option>
                        ))}
                    </select>
                </InputContainer>
                {fields}
                {expandableFields && <Expandable maxHeight={expandableHeight}>{expandableFields}</Expandable>}
            </div>
        </Container>
    );

    function autofill() {
        face.autofill(otherFace);
        setCampaign(campaign.clone());
    }

    function setFaceType(faceType) {
        face.type = faceType;
        face.cardType = null;
        face.subType = null;
        face = getCardFaceClassInstance(face);
        setCampaign(campaign.clone());
    }
}
