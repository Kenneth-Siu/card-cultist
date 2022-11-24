import React from "react";
import "./IconButton.scss";

export default function IconButton({ className = "", children, ...props }) {
    return <button className={`icon-button ${className}`} {...props}>{children}</button>;
}
