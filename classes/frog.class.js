class Frog extends MovableObject {
    width = 31.5;
    height = 35;
    x;
    y;
    speed;
    leftBorder;
    rightBorder;
    widths = [31.5, 31.5, 30, 30, 90, 90, 66, 37.5];
    characterNearby = false;
    attackArea = 80;
    attacking = false;

    IMAGES_ATTACK = [
        'img/enemies/frog/attack/attack_01.png',
        'img/enemies/frog/attack/attack_02.png',
        'img/enemies/frog/attack/attack_03.png',
        'img/enemies/frog/attack/attack_04.png',
        'img/enemies/frog/attack/attack_05.png',
        'img/enemies/frog/attack/attack_06.png',
        'img/enemies/frog/attack/attack_07.png',
        'img/enemies/frog/attack/attack_08.png',
    ];

    IMAGES_DEAD = [
        'img/enemies/frog/hit/hit_05.png',
        'img/enemies/frog/hit/hit_04.png',
        'img/enemies/frog/hit/hit_03.png',
        'img/enemies/frog/hit/hit_02.png',
        'img/enemies/frog/hit/hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/frog/hit/hit_01.png',
        'img/enemies/frog/hit/hit_02.png',
        'img/enemies/frog/hit/hit_03.png',
        'img/enemies/frog/hit/hit_04.png',
        'img/enemies/frog/hit/hit_05.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/frog/idle/idle_01.png',
        'img/enemies/frog/idle/idle_02.png',
        'img/enemies/frog/idle/idle_03.png',
        'img/enemies/frog/idle/idle_04.png',
        'img/enemies/frog/idle/idle_05.png',
        'img/enemies/frog/idle/idle_06.png',
        'img/enemies/frog/idle/idle_07.png',
        'img/enemies/frog/idle/idle_08.png',
        'img/enemies/frog/idle/idle_09.png',
        'img/enemies/frog/idle/idle_10.png',
        'img/enemies/frog/idle/idle_11.png',
    ];

    IMAGES_RUN = [
        'img/enemies/frog/run/run_01.png',
        'img/enemies/frog/run/run_02.png',
        'img/enemies/frog/run/run_03.png',
        'img/enemies/frog/run/run_04.png',
        'img/enemies/frog/run/run_05.png',
        'img/enemies/frog/run/run_06.png',
        'img/enemies/frog/run/run_07.png',
        'img/enemies/frog/run/run_08.png',
        'img/enemies/frog/run/run_09.png',
        'img/enemies/frog/run/run_10.png',
        'img/enemies/frog/run/run_11.png',
        'img/enemies/frog/run/run_12.png',
    ];

    constructor(x, y, leftBorder, rightBorder) {
        super().loadImage("img/enemies/frog/run/run_01.png");
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_RUN);
        this.x = x + Math.random() * 252;
        this.y = y;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.speed = 0.5 + Math.random() * 0.3;
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
        this.animate();
    }

    /**
    * This function animates the frogs movement.
    */
    animateMovement() {
        if (!this.attacking) {
            if (this.otherDirection) {
                return this.animateMovementRight();
            } else {
                return this.animateMovementLeft();
            }
        }
    }

    /**
    * This function animates the frogs movement if it's facing to the left. 
    * The frog changes direction, if the character is behind him or if it reaches the movement-border.
    */
    animateMovementLeft() {
        if (this.x <= this.leftBorder) {
            this.setOtherDirectionTimeout(true);
        } else if (this.characterNearby && world.character.x > this.x) {
            this.setOtherDirectionTimeout(true);
        }
        this.moveLeft();
        return this.otherDirection = false;
    }

    /**
    * This function animates the frogs movement if it's facing to the right. 
    * The frog changes direction, if the character is behind him or if it reaches the movement-border.
    */
    animateMovementRight() {
        if (this.x >= this.rightBorder) {
            this.setOtherDirectionTimeout(false);
        } else if (this.characterNearby && world.character.x < this.x) {
            this.setOtherDirectionTimeout(false);
        }
        this.moveRight();
        return this.otherDirection = true;
    }

    /**
    * This function sets otherDirection to true or false, depending on the given value.
    * 
    * @param {boolean} boolean - true or false
    */
    setOtherDirectionTimeout(boolean) {
        setTimeout(() => {
            return this.otherDirection = boolean;
        }, 200);
    }

    /**
    * This function animates the frogs images for each situation (death, hit, attack, run).
    */
    animateImages() {
        if (this.isDead()) {
            this.speed = 0;
            this.width = 31.5;
            return this.animateDeath();
        } else if (this.isHurt) {
            this.width = 31.5;
            this.playAnimation(this.IMAGES_HIT);
        } else if (this.attacking == true || this.characterNearby) {
            this.animateAttack();
        } else {
            this.width = 31.5;
            this.playAnimation(this.IMAGES_RUN);
        }
    }

    /**
    * This function animates the attack-animation.
    */
    animateAttack() {
        if (this.otherDirection) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.x += this.width;
            this.playAnimation(this.IMAGES_ATTACK);
            this.x -= this.width;
        }
    }
}