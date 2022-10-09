import React, { useState } from "react";

export default function useLoadedImages() {
    const [loadedImages, setLoadedImages] = useState([]);

    function loadPublicImage(src) {
        return new Promise((resolve) => {
            const imageRef = React.createRef();
            setLoadedImages((loadedImages) => [
                ...loadedImages,
                <img
                    ref={imageRef}
                    key={src}
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
        const src = URL.createObjectURL(new Blob([data]));
        return await loadPublicImage(src);
    }

    return [loadedImages, loadPublicImage, loadFileSystemImage];
}
