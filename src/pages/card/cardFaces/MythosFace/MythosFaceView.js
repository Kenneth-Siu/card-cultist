import React from "react";
import MythosFaceCanvas from "./MythosFaceCanvas";
import Container from "../../../../components/container/Container";
import "../FaceView.scss";

export default function MythosFaceView({ typeSelect }) {
    return (
        <Container className="face-view">
            <MythosFaceCanvas />
            <div className="form-container">{typeSelect}</div>
        </Container>
    );
}
