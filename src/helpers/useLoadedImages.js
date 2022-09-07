import React, { useState } from "react";

export default function useLoadedImages() {
    const [loadedImages, setLoadedImages] = useState([]);

    function loadImage(src, width, height) {
        return new Promise((resolve) => {
            Promise.all([
                ...(src
                    ? []
                    : [
                          window.fs.openImage().then(({ data }) => {
                              src = URL.createObjectURL(new Blob([data]));
                          }),
                      ]),
            ]).then(() => {
                const imageRef = React.createRef();
                setLoadedImages((loadedImages) => [
                    ...loadedImages,
                    <img
                        ref={imageRef}
                        key={src}
                        src={src}
                        width={width !== undefined ? `${width}` : ""}
                        height={height !== undefined ? `${height}` : ""}
                        onLoad={() => resolve(imageRef.current)}
                    />,
                ]);
            });
        });
    }

    return [loadedImages, loadImage];
}
