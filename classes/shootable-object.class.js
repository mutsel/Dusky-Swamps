class ShootableObject extends MovableObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    shoot(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 12; 
        setInterval(() => {
            this.x += 10;
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