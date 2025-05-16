class ShootableObject extends MovableObject {
    x;
    y;
    speed;

    constructor(x, y, speed) {
        super();
        this.x = x; 
        this.y = y;
        this.speed = speed; 
    }

    /**
     * This function is used for a shootable object to move left by substracting its speed from its x-position.
     * The result is its new x-position.
     */
    shoot() {
        setInterval(() => {
            this.x -= this.speed;
            this.otherDirection = true;
        }, 1000 / 60);
        if (this instanceof MagicAttack) {
            this.animate();
        }
    }

    /**
    * This function is used to animate the shootable Object
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES); 
        }, 1000 / 20)
    }
}