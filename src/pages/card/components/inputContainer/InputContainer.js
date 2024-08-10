import React from "react";
import DebouncedTextInput from "../../../../components/debouncedInputs/DebouncedTextInput";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";
import "./InputContainer.scss";

export default function InputContainer({ children, type, label, value, setValue, vCentered }) {
    return (
        <div className="input-container">
            <label className={`${vCentered ? "v-centered" : ""}`}>{label}</label>
            {children ? (
                children
            ) : type === "text" ? (
                <DebouncedTextInput value={value} setValue={setValue} />
            ) : type === "textarea" ? (
                <DebouncedTextareaInput value={value} setValue={setValue} />
            ) : (
                <input type={type} value={value} onChange={(event) => setValue(event.target.value)} />
            )}
        </div>
    );
}
