import React, { useState } from "react";
import useDebounce from "../../helpers/useDebounce";

export default function DebouncedTextInput({ value, setValue }) {
    const [text, setText] = useState(value);

    const debouncedUpdate = useDebounce(() => {
        setValue(text);
    });

    const updateText = (newText) => {
        setText(newText);
        debouncedUpdate();
    };

    return <input type="text" value={text} onChange={(event) => updateText(event.target.value)} />;
}
