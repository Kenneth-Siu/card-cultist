import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import Container from "../../../../components/container/Container";
import "../FaceView.scss";

export default function BlankFaceView({ typeSelect }) {
    return (
        <Container className="face-view">
            <BlankFaceCanvas />
            <div className="form-container">{typeSelect}</div>
        </Container>
    );
}
