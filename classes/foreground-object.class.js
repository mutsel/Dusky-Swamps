class ForegroundObject extends MovableObject {
    width = 721;
    height = 450;
    y = 60;
    speed = 4;

    constructor(x) {
        super().loadImage("./img/scenery/foreground.png");
        this.x = x;
    }
}   