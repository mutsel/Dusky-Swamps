class Sky extends MovableObject {
    width = 721;
    height = 380;
    y = 0;
    speed = 0.05;

    constructor(x) {
        super().loadImage("img/scenery/sky.png");
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
} 