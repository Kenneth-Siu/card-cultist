import React, { useEffect, useState } from "react";
import { connectionSymbols } from "../../../../models/canvasLayers/cardLayers/connectionSymbol/connectionSymbols";
import "./ConnectionPicker.scss";

// TODO center and highligh on current symbol

export default function ConnectionPicker({ connection, setConnection }) {
    const [showPicker, setShowPicker] = useState(false);
    const symbol = connectionSymbols.find((o) => o.name === connection);

    useEffect(() => {
        function callback(event) {
            if (event.code === "Escape" || event.type === "click") {
                setShowPicker(false);
            }
        }

        if (showPicker) {
            document.addEventListener("keydown", callback, { once: true, passive: true });
            document.addEventListener("click", callback, { once: true, passive: true });
        }

        return () => {
            document.removeEventListener("keydown", callback);
            document.removeEventListener("click", callback);
        };
    }, [showPicker]);

    return (
        <div className="connection-picker">
            <button className="connection-picker-button" onClick={togglePicker}>
                {symbol.icon ? (
                    <img src={symbol?.icon} style={{ backgroundColor: symbol?.color }} />
                ) : (
                    <div className="placeholder"></div>
                )}
            </button>
            {showPicker && (
                <div className="connection-picker-select">
                    {connectionSymbols.map((s) => (
                        <button onClick={() => setConnection(s.name)}>
                            {s.icon ? (
                                <img src={s?.icon} style={{ backgroundColor: s?.color }} />
                            ) : (
                                <div className="placeholder"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    function togglePicker() {
        setShowPicker(!showPicker);
    }
}
