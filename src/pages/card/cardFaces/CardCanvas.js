import React, { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import ImageTransform from "../../../models/ImageTransform";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../cardConstants";

const TRANSFORM = {
    NONE: "none",
    TRANSLATE: "translate",
    SCALE: "scale",
    ROTATE: "rotate",
};

export const ORIENTATION = {
    LANDSCAPE: "landscape",
    PORTRAIT: "portrait",
};

const throttledHandleMove = throttle((event, transformState, startIllustrationTransform, setIllustrationTransform) => {
    if (transformState.mouseStart) {
        if (event.ctrlKey || event.metaKey) {
            if (transformState.transformType !== TRANSFORM.ROTATE) {
                startIllustrationTransform(event);
            } else {
                setIllustrationTransform(
                    new ImageTransform(transformState.startingTransform).withRotation(
                        transformState.startingTransform.rotation + (event.clientY - transformState.mouseStart.y)
                    )
                );
            }
        } else if (event.shiftKey) {
            if (transformState.transformType !== TRANSFORM.SCALE) {
                startIllustrationTransform(event);
            } else {
                setIllustrationTransform(
                    new ImageTransform(transformState.startingTransform).withScale(
                        transformState.startingTransform.scale + (event.clientY - transformState.mouseStart.y) * 0.01
                    )
                );
            }
        } else {
            if (transformState.transformType !== TRANSFORM.TRANSLATE) {
                startIllustrationTransform(event);
            } else {
                setIllustrationTransform(
                    new ImageTransform(transformState.startingTransform)
                        .withX(transformState.startingTransform.x + (event.clientX - transformState.mouseStart.x) * 2)
                        .withY(transformState.startingTransform.y + (event.clientY - transformState.mouseStart.y) * 2)
                );
            }
        }
    }
}, 15);

export default function CardCanvas({
    loadedImages,
    canvasLayers,
    orientation,
    illustrationTransform,
    setIllustrationTransform,
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            refreshCanvas();
        }
    }, canvasLayers);

    const [transformState, setTransformState] = useState({
        mouseStart: null,
        startingTransform: null,
        transformType: TRANSFORM.NONE,
    });

    const mouseProps =
        illustrationTransform && setIllustrationTransform
            ? {
                  onMouseDown: (event) => {
                      startIllustrationTransform(event);
                  },
                  onMouseOut: () => {
                      setTransformState({ mouseStart: null, transformType: TRANSFORM.NONE });
                  },
                  onMouseUp: () => {
                      setTransformState({ mouseStart: null, transformType: TRANSFORM.NONE });
                  },
                  onMouseMove: (event) => {
                      throttledHandleMove(event, transformState, startIllustrationTransform, setIllustrationTransform);
                  },
              }
            : {};

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                className={`preview ${orientation}`}
                width={orientation === ORIENTATION.LANDSCAPE ? CARD_PORTRAIT_HEIGHT : CARD_PORTRAIT_WIDTH}
                height={orientation === ORIENTATION.LANDSCAPE ? CARD_PORTRAIT_WIDTH : CARD_PORTRAIT_HEIGHT}
                onLoad={() => refreshCanvas()}
                {...mouseProps}
            />
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasLayers.reduce((prevY, canvasLayer) => {
            const box = canvasLayer && canvasLayer.draw(context, prevY);
            return box ? box.y : 0;
        }, 0);
    }

    function startIllustrationTransform(event) {
        setTransformState({
            mouseStart: { x: event.clientX, y: event.clientY },
            startingTransform: new ImageTransform(illustrationTransform),
            transformType:
                event.ctrlKey || event.metaKey
                    ? TRANSFORM.ROTATE
                    : event.shiftKey
                    ? TRANSFORM.SCALE
                    : TRANSFORM.TRANSLATE,
        });
    }
}
