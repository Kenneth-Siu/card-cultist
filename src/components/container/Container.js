import React from "react";
import "./Container.scss";

export default function Container({ className = "", children }) {
    return <div className={`container ${className}`}>{children}</div>;
}
