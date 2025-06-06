class ForegroundObject extends MovableObject {
    width = 721;
    height = 450;
    y = 60;
    speed = 4;

    constructor(x) {
        super().loadImage("./img/scenery/foreground.png");
        this.x = x;
    }

    /**
     * This function is used to animate fore- and background-objects to give the illusion of depth (parallaxe).
     * When the player reaches the endboss-area, the objects stop moving.
     * 
     * @param {Object} objects - the fore- and background-objects to be animated
     */
    animate() {
        if (keyboard.LEFT && world.character.x > 0 && !world.firstBossContact) {
            this.moveRight();
        }
        if (keyboard.RIGHT && !world.firstBossContact) {
            this.moveLeft();
        }
    }
}  