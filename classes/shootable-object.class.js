class ShootableObject extends MovableObject {
    x;
    speed;

    constructor(x, speed) {
        super();
        this.x = x;
        this.speed = speed;
    }

    /**
    * This function returns a positive or negative speed-value depending on the movable objects direction.
    * 
    * @param {Object} mo - the movable object shooting (character or endboss)
    * @param {number} speed - the speed of the shootable object
    */
    setSpeed(mo, speed) {
        if (mo.otherDirection) return speed;
        return -speed;
    }

    /**
     * This function is used for a shootable object to move left by substracting its speed from its x-position.
     * The result is its new x-position.
     */
    animateMovement() { if (!world.gamePaused) this.x -= this.speed; }
}