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
    isAttacking = false;

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

    imageTypes = ["IMAGES_ATTACK", "IMAGES_DEAD", "IMAGES_HIT", "IMAGES_IDLE", "IMAGES_RUN"];

    constructor(x, y, leftBorder, rightBorder) {
        super().loadImage("img/enemies/frog/run/run_01.png");
        super.loadImages(this.imageTypes);
        this.x = x + Math.random() * 100;
        this.y = y;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.speed = 0.5 + Math.random() * 0.3;
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
    }

    /**
    * This function animates the frogs movement.
    */
    animateMovement() {
        if (!world.gamePaused && !this.isAttacking) {
            if (this.otherDirection) return this.animateMovementRight();
            else return this.animateMovementLeft();
        }
    }

    /**
    * This function animates the frogs movement if it's facing to the left. 
    * The frog changes direction, if the character is behind him or if it reaches the movement-border.
    */
    animateMovementLeft() {
        if (this.x <= this.leftBorder) this.setOtherDirectionTimeout(true);
        else if (this.characterNearby && world.character.x > this.x) this.setOtherDirectionTimeout(true);
        this.moveLeft();
        return this.otherDirection = false;
    }

    /**
    * This function animates the frogs movement if it's facing to the right. 
    * The frog changes direction, if the character is behind him or if it reaches the movement-border.
    */
    animateMovementRight() {
        if (this.x >= this.rightBorder) this.setOtherDirectionTimeout(false);
        else if (this.characterNearby && world.character.x < this.x) this.setOtherDirectionTimeout(false);
        this.moveRight();
        return this.otherDirection = true;
    }

    /**
    * This function sets otherDirection to true or false, depending on the given value.
    * 
    * @param {boolean} boolean - true or false
    */
    setOtherDirectionTimeout(boolean) { setTimeout(() => { return this.otherDirection = boolean; }, 200) }

    /**
    * This function animates the frogs images for each situation (death, hit, attack, run).
    */
    animateImages() {
        if (!world.gamePaused) {
            if (this.isDead()) return this.animateDeath();
            else if (this.isHurt) this.playAnimation(this.IMAGES_HIT);
            else if (this.isAttacking || this.characterNearby) this.adjustAttackDirection();
            else this.playAnimation(this.IMAGES_RUN);
        }
    }

    /**
    * This function plays the attack-animation. The images are adjusted to the frogs direction.
    */
    adjustAttackDirection() {
        if (this.otherDirection) { this.playAnimation(this.IMAGES_ATTACK); }
        else {
            this.x += this.width;
            this.playAnimation(this.IMAGES_ATTACK);
            this.x -= this.width;
        }
    }

    /**
    * This function animates the frogs attack and the corresponding width.
    * 
    * @param {number} i - the modulos residual value for the attack-frame
    */
    animateAttack(i) {
        this.width = this.widths[i];
        if (i < 7) this.attacking = true;
        else {
            this.attacking = false;
            playAudio("frogAttack");
        }
    }
}