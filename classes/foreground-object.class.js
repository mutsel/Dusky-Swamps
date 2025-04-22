class ForegroundObject extends MovableObject {
    width = 721;
    height = 480;
    y = 20;
    speed = 4;

    constructor(x) {
        super().loadImage("img/scenery/Foreground.png");
        this.x = x;
    }
} 