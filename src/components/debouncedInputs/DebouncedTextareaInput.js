import React, { useState } from "react";
import useDebounce from "../../helpers/useDebounce";

export default function DebouncedTextareaInput({ value, setValue }) {
    const [text, setText] = useState(value);

    const debouncedUpdate = useDebounce(() => {
        setValue(text);
    });

    const updateText = (newText) => {
        setText(newText);
        debouncedUpdate();
    };

    return <textarea value={text} onChange={(event) => updateText(event.target.value)} />;
}
