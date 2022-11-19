import React, { useRef, useState } from "react";
import "./Expandable.scss";

export default function Expandable({ maxHeight, className, children }) {
    const [expanded, setExpanded] = useState(false);
    const thingy = useRef(null);

    return (
        <div className={`expandable ${expanded ? "expanded" : ""} ${className ? className : ""}`}>
            <div className="height-transitioning" style={expanded && maxHeight ? { maxHeight: maxHeight } : null}>
                <div ref={thingy} className="display-none">
                    {children}
                </div>
            </div>
            <button className="less-more-button" onClick={toggle}>
                {expanded ? "Less…" : "More…"}
            </button>
        </div>
    );

    function toggle() {
        if (expanded) {
            setExpanded(false);
            setTimeout(() => (thingy.current.className = "display-none"), 200);
        } else {
            // TODO clear timer
            setExpanded(true);
            thingy.current.className = "display-block";
        }
    }
}
