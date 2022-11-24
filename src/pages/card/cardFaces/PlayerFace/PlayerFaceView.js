import React from "react";
import PlayerFaceCanvas from "./PlayerFaceCanvas";
import Container from "../../../../components/container/Container";
import "../FaceView.scss";

export default function PlayerFaceView({ typeSelect }) {
    return (
        <Container className="face-view">
            <PlayerFaceCanvas />
            <div className="form-container">{typeSelect}</div>
        </Container>
    );
}
