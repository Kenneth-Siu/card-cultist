import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import "./Illustration.scss";

export default function Illustration({ face, campaign, setCampaign, setIllustrationTransform }) {
    return (
        <div className="illustration-view">
            <div>
                <button className="load-image-button" onClick={() => setIllustration()}>
                    <span className="emoji">📁</span>
                    <span>Load Image</span>
                </button>
            </div>

            <div className="transform-container">
                <div className="row">
                    <label className="text" htmlFor="x">
                        X Position
                    </label>
                    <label htmlFor="x">
                        <ArrowForwardIcon />
                    </label>
                    <input
                        id="x"
                        type="number"
                        step="1"
                        value={face.illustrationTransform.x}
                        onChange={(event) => setIllustrationX(parseInt(event.target.value))}
                    />
                </div>
                <div className="row">
                    <label className="text" htmlFor="y">
                        Y Position
                    </label>
                    <label htmlFor="y">
                        <ArrowDownwardIcon />
                    </label>
                    <input
                        id="y"
                        type="number"
                        step="1"
                        value={face.illustrationTransform.y}
                        onChange={(event) => setIllustrationY(parseInt(event.target.value))}
                    />
                </div>
            </div>
            <div className="transform-container">
                <div className="row">
                    <label className="text" htmlFor="scale">
                        Scale
                    </label>
                    <label htmlFor="scale">
                        <ZoomOutMapIcon />
                    </label>
                    <input
                        id="scale"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={(face.illustrationTransform.scale * 100).toFixed(2)}
                        onChange={(event) => setIllustrationScale(parseFloat(event.target.value / 100))}
                    />
                </div>
                <div className="row">
                    <label className="text" htmlFor="rotation">
                        Rotation
                    </label>
                    <label htmlFor="rotation">
                        <RotateRightIcon />
                    </label>
                    <input
                        id="rotation"
                        type="number"
                        step="0.1"
                        value={face.illustrationTransform.rotation.toFixed(1)}
                        onChange={(event) => setIllustrationRotation(parseFloat(event.target.value))}
                    />
                </div>
            </div>
            <div className="illustrator-container">
                <label>
                    <span>Illustrator</span>
                    <input
                        type="text"
                        value={face.illustrator}
                        onChange={(event) => setIllustrator(event.target.value)}
                    />
                </label>
            </div>
        </div>
    );

    async function setIllustration() {
        const path = await window.fs.chooseImage();
        face.illustration = path;
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

    function setIllustrator(illustrator) {
        face.illustrator = illustrator;
        setCampaign(campaign.clone());
    }
}
