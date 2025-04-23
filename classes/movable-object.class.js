class MovableObject extends DrawableObject {
    speed = 10;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    otherDirection = false;
    isHurt = false;
    speedY = 0;
    acceleration = 0.5;
    energy = 100;

    constructor() {
        super();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < 380 - this.height;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    isColliding(mo) {
        return ((this.x + this.offset.left) + (this.width - this.offset.right) > (mo.x + mo.offset.left))
            && ((this.y + this.offset.top) + (this.height - this.offset.bottom) > (mo.y + mo.offset.top))
            && ((this.x + this.offset.left) < (mo.x + mo.offset.left) + (mo.width - mo.offset.right))
            && ((this.y + this.offset.top) < (mo.y + mo.offset.top) + (mo.height - mo.offset.bottom))
    }

    hit() {
        if (this.isHurt == false) {
            this.energy -= 25;
            if (this.energy <= 0) {
                this.energy = 0;
            }
            this.isHurt = true;
            setTimeout(() => {
                this.isHurt = false;
            }, 1000);
        }
    }

    isDead() {
        return this.energy == 0;
    }
} 