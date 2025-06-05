class Sky extends MovableObject {
    width = 721;
    height = 380;
    y = 0;
    speed = 0.1;

    constructor(x) {
        super().loadImage("./img/scenery/sky.png");
        this.x = x;
        this.animate();
    }

    /**
    * This function is used to animate the movable Object (movement)
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
} 