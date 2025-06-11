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
    isJumping = false;
    speedY = 0;
    acceleration = 0.5;
    energy = 100;
    deathAnimationCounter;
    isAlive = true;

    constructor() { super(); }

    /**
     * This function is used for objects that should experience gravity.
     * If the object is above the set ground, it will move towards it with a given speed and acceleration until it hits the ground.
     */
    applyGravity() {
        if (!world.gamePaused) {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (!this.isAboveGround()) {
                this.speedY = 0;
                this.isJumping = false;
                this.touchedGroundBeforeBounce = true;
                this.y = this.getGroundY();
            }
        }
    }

    /**
     * This function checks whether an objects bottom border is above the ground level.
     * In case of the plattforms, those values are different to the ground so beforehand it is checked where the object is situated.
     */
    isAboveGround() {
        if (this.isAboveFirstPlattform()) return this.y < 256 - this.height;
        if (this.isAboveSecondPlattform()) return this.y < 192 - this.height;
        if (this.isAboveThirdPlattform()) return this.y < 256 - this.height;
        return this.y < 380 - this.height;
    }

    /**
     * This function returns the ground-y-coordinate for each plattform and the ground.
     * This way, it is made safe, that each entity is set back to the exact ground level are falling/jumping/...
     */
    getGroundY() {
        if (this.isAboveFirstPlattform()) return 261 - this.height;
        if (this.isAboveSecondPlattform()) return 197 - this.height;
        if (this.isAboveThirdPlattform()) return 261 - this.height;
        return 385 - this.height;
    }

    /**
     * This function returns true, if the character is above the first plattform
     */
    isAboveFirstPlattform() { return this.x >= 460 - (this.width / 1.5) && this.x <= 716 - (this.width / 1.5) && this.y < 266 - this.height; }

    /**
     * This function returns true, if the character is above the second plattform
     */
    isAboveSecondPlattform() { return this.x >= 860 - (this.width / 1.5) && this.x <= 1048 - (this.width / 1.5) && this.y < 202 - this.height; }

    /**
     * This function returns true, if the character is above the third plattform
     */
    isAboveThirdPlattform() { return this.x >= 1240 - (this.width / 1.5) && this.x <= 1496 - (this.width / 1.5) && this.y < 266 - this.height; }

    /**
     * This function plays an repeating animation of the given images.
     * It iterates through the array and starts again at the beginning after reaching the end.
     * 
     * @param {Array} images - the collection of images used for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this instanceof Frog) {
            this.width = 31.5;
            if (images == this.IMAGES_ATTACK) this.animateAttack(i);
        }
        if (this instanceof Endboss && images == this.IMAGES_ATTACK) { this.animateAttack(i); }
    }

    /**
     * This function is used to animate fore- and background-objects to give the illusion of depth (parallaxe).
     * When the player reaches the endboss-area, the objects stop moving.
     * 
     * @param {Object} objects - the fore- and background-objects to be animated
     */
    animateScenery() {
        if (keyboard.LEFT && world.character.x > 0 && !world.firstBossContact) this.moveRight();
        if (keyboard.RIGHT && !world.firstBossContact) this.moveLeft();
    }

    /**
    * This function returns true, if the character is on the left-hand side of the enemy.
    */
    characterIsOnTheLeftHandSide() { return world.character.x + world.character.width < this.x; }

    /**
    * This function returns true, if the character is on the right-hand side of the enemy.
    */
    characterIsOnThRightHandSide() { return world.character.x > this.x + this.width; }

    /**
     * This function is used for an object to move left by substracting its speed from its x-position. The result is its new x-position.
     */
    moveLeft() { this.x -= this.speed; }

    /**
     * This function is used for an object to move right by adding its speed to its x-position. The result is its new x-position.
     */
    moveRight() { this.x += this.speed; }

    /**
     * This function checks, whether the object is colliding with another movable object.
     * For each of the four borders of the object, it is checked if this border is overlapping with the border of another movable object.
     * It returns true or false.
     * 
     * @param {Object} mo - a movable object
     */
    isColliding(mo) {
        return (this.x + this.width > mo.x)    //Right
            && (this.y + this.height > mo.y)   //Bottom
            && (this.x < mo.x + mo.width)      //Left
            && (this.y < mo.y + mo.height)     //Top
    }

    /**
     * This function is similar to the isColliding-function, but it checks if the character approaches the other object with its bottom border to the objects top border.
     * Like this, it is checked if the character hits the other object by jumping or falling on top of it.
     * Furthermore it is checked, if the characters speedY is zero or negative to prevent a false positive result when hitting the enemie from the bottom.
     * It returns true or false.
     * 
     * @param {Object} mo - a movable object
     */
    isJumpingOnTop(mo) {
        return (this.y + this.height > mo.y)                        //B-T
            && (this.y + this.height < mo.y + mo.height * 0.5)      //B-B 
            && (this.y < mo.y)                                      //T-T
            && (this.x + this.width > mo.x)                         //R
            && (this.x < mo.x + mo.width)                           //L
    }

    /**
     * This function checks if the objects isHurt-status is currently false (objects wont take damage again after being hit recently).
     * If so and the objects energy is above zero it substracts the damage from the objects energy and turns the istHurt-state to true.
     * After 500 miliseconds, the isHurt-state is turned back to false.
     * 
     * @param {number} damage - the amount of energy the hit will cost.
     */
    hit(damage) {
        if (this.isHurt == false) {
            if (this instanceof Character && this.energy > 0) playAudio("characterHurt");
            this.energy -= damage;
            if (this.energy <= 0) this.energy = 0;
            else {
                this.isHurt = true;
                setTimeout(() => { this.isHurt = false; }, 500);
            }
        }
    }

    /**
     * This function returns true, if the objects energy is equal to zero (if the object is dead)
     */
    isDead() { return this.energy == 0; }

    /**
     * This function shows the death-animation for each character
     */
    animateDeath() {
        this.speed = 0;
        if (this.deathAnimationCounter <= 0) {
            this.loadImage('./img/dead_animation_universal/dead.png');
            if (this instanceof Character) world.gameOver = true;
            if (this instanceof Endboss) world.victory = true;
            this.isAlive = false;
            world.removeDeadEnemy();
        } else {
            this.playAnimation(this.IMAGES_DEAD);
            return this.deathAnimationCounter--;
        }
    }
}