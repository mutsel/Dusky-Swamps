class MovableObject extends DrawableObject {
    x = 0
    y = 0;
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
        //large plattform
        if (this.x >= 460 - (this.width / 1.5) && this.x <= 716 - (this.width / 1.5) && this.y < 266 - this.height) {
            return this.y < 256 - this.height;
        }

        //medium plattform
        if (this.x >= 860 - (this.width / 1.5) && this.x <= 1048 - (this.width / 1.5) && this.y < 202 - this.height) {
            return this.y < 192 - this.height;
        }

        //ground
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

    // isColliding(mo) {
    //     return ((this.x + this.offset.left) + (this.width - this.offset.right) > (mo.x + mo.offset.left))
    //         && ((this.y + this.offset.top) + (this.height - this.offset.bottom) > (mo.y + mo.offset.top))
    //         && ((this.x + this.offset.left) < (mo.x + mo.offset.left) + (mo.width - mo.offset.right))
    //         && ((this.y + this.offset.top) < (mo.y + mo.offset.top) + (mo.height - mo.offset.bottom))
    // }

    isColliding(mo) {
        return (this.x + this.width > mo.x)    //R
            && (this.y + this.height > mo.y)   //B
            && (this.x < mo.x + mo.width)      //L
            && (this.y < mo.y + mo.height)     //T
    }

    isJumpingOnTop(mo) {
        return (this.y + this.height > mo.y)                //B-T
            && (this.y + this.height < mo.y + mo.height)    //B-B
            && (this.y < mo.y)                              //T-T
            && (this.x + this.width > mo.x)                 //R
            && (this.x < mo.x + mo.width)                   //L
            && this.speedY <= 0;


        // return (this.x + this.width > mo.x)    //R
        //     && (this.y + this.height > mo.y)   //B!
        //     && (this.x < mo.x + mo.width)      //L
        //     && (this.y < mo.y + mo.height)     //T
    }

    hit(damage) {
        if (this.isHurt == false) {
            this.energy -= damage;
            if (this.energy <= 0) {
                this.energy = 0;
            }
            this.isHurt = true;
            if (this instanceof Character) {
                setTimeout(() => {
                    this.isHurt = false;
                }, 1000);
            } else {
                setTimeout(() => {
                    this.isHurt = false;
                }, 500);
            }
        }
    }

    isDead() {
        return this.energy == 0;
    }
} 