import React from "react";
import "./InputContainer.scss";

export default function InputContainer({ children, type, label, value, setValue, vCentered }) {
    return (
        <div className="input-container">
            <label className={`${vCentered ? "v-centered" : ""}`}>{label}</label>
            {children ? (
                children
            ) : (
                <input type={type} value={value} onChange={(event) => setValue(event.target.value)} />
            )}
        </div>
    );
}
