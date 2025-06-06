class Sky extends MovableObject {
    width = 721;
    height = 380;
    y = 0;
    speed = 0.1;

    constructor(x) {
        super().loadImage("./img/scenery/sky.png");
        this.x = x;
    }

    /**
    * This function is used to animate the movable Object (movement)
    */
    animate() {
        if (!world.gamePaused) {
            this.moveLeft();
        }
    }
} 