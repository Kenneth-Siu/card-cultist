import React, { useState } from "react";
import { isSvgPath } from "./isSvgPath";

export default function useLoadedImages() {
    const [loadedImages, setLoadedImages] = useState([]);

    function loadPublicImage(src) {
        return new Promise((resolve) => {
            const imageRef = React.createRef();
            setLoadedImages((loadedImages) => [
                ...loadedImages,
                <img
                    ref={imageRef}
                    key={Math.random().toString(36).slice(2)}
                    src={src}
                    onLoad={() => {
                        resolve(imageRef.current);
                    }}
                />,
            ]);
        });
    }

    async function loadFileSystemImage(path) {
        if (!path) {
            return undefined;
        }
        const data = await window.fs.openImage(path);
        const src = await getSrcFromData(path, data);
        return await loadPublicImage(src);
    }

    return [loadedImages, loadPublicImage, loadFileSystemImage];
}

async function getSrcFromData(path, data) {
    if (isSvgPath(path)) {
        return "data:image/svg+xml; charset=utf8, " + encodeURIComponent(await new Blob([data]).text());
    }
    return URL.createObjectURL(new Blob([data]));
}
