class BackgroundObject extends MovableObject {
    constructor(ImagePath, x, y, width, height) {
        super().loadImage(ImagePath);
        this.y = y;
        this.x = x;
        this.width = width;
        this.height = height;
    }
} 