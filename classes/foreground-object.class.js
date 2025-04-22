class ForegroundObject extends MovableObject {
    width = 721;
    height = 480;
    y = 0;
    speed = 12;

    constructor(x) {
        super().loadImage("img/scenery/Foreground.png");
        this.x = x;
        // this.animate();
    }

    // animate() {
    //     setInterval(() => {
    //         if (this.world.keyboard.LEFT && this.x > 0) {
    //             this.moveLeft();
    //         }
    //         if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
    //             this.moveRight();
    //         }
    //     }, 1000 / 30);
    // }
}  