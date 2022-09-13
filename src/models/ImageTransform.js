export default class ImageTransform {
    constructor(transform) {
        this.x = (transform && transform.x) || 0;
        this.y = (transform && transform.y) || 0;
        this.scale = (transform && transform.scale) || 1;
        this.rotation = (transform && transform.rotation) || 0;
    }
}
