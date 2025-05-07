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

    shoot() {
        setInterval(() => {
            this.x -= this.speed;
            this.otherDirection = true;
        }, 1000 / 60);
        if (this instanceof MagicAttack) {
            this.animate();
        }
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000 / 20)
    }
}