class Decoration extends DrawableObject {

    constructor(imagePath, width, height, x) {
        super();
        this.loadImage(imagePath);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = 382 - this.height;
    }
}