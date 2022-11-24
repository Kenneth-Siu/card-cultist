import React from "react";
import Container from "../../../components/container/Container";
import getCardFaceClassInstance from "../../../helpers/getCardFaceClassInstance";
import InputContainer from "../components/inputContainer/InputContainer";
import Expandable from "../components/expandable/Expandable";
import "./FaceView.scss";

export default function BaseFaceView({
    listOfCardFaces,
    face,
    canvas,
    fields,
    expandableHeight,
    expandableFields,
    campaign,
    setCampaign,
}) {
    return (
        <Container className="face-view">
            {canvas}
            <div className="form-container">
                <InputContainer label="Card Face">
                    <select value={face?.type} onChange={(event) => setFaceType(event.target.value)}>
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

    function setFaceType(faceType) {
        face.type = faceType;
        face.cardType = null;
        face.subType = null;
        face = getCardFaceClassInstance(face);
        setCampaign(campaign.clone());
    }
}
