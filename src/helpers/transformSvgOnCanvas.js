export function transformSvgOnCanvas(canvasBox, svgBox, targetWidth) {
    const scaleWithHeight = svgBox.h / svgBox.w > canvasBox.h / canvasBox.w;
    const width = scaleWithHeight ? (svgBox.w / svgBox.h) * canvasBox.h : canvasBox.w;
    const height = scaleWithHeight ? canvasBox.h : (svgBox.h / svgBox.w) * canvasBox.w;

    return {
        scale: targetWidth / Math.max(width, height),
        xNudge: height > width ? targetWidth * ((height - width) / (height * 2)) : 0,
        yNudge: width > height ? targetWidth * ((width - height) / (width * 2)) : 0,
    };
}
