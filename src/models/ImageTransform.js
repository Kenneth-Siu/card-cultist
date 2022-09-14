export default class ImageTransform {
    constructor(transform) {
        this.x = (transform && transform.x) || 0;
        this.y = (transform && transform.y) || 0;
        this.scale = Math.max(0.01, (transform && transform.scale) || 1);
        this.rotation = (transform && transform.rotation) || 0;
    }

    withX(x) {
        this.x = x;
        return this;
    }
    withY(y) {
        this.y = y;
        return this;
    }
    withScale(scale) {
        this.scale = Math.max(0.01, scale);
        return this;
    }
    withRotation(rotation) {
        this.rotation = rotation;
        return this;
    }
}
