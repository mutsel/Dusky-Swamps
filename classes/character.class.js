class Character extends MovableObject {
    x = 160;
    y = 200;
    width = 35;
    height = 50;
    speed = 4;
    world;
    timeIdling = 0;
    isSleeping = false;

    IMAGES_ATTACK = [
        'img/character/hit/hit_03.png',
        'img/character/hit/hit_04.png',
        'img/character/hit/hit_05.png',
        'img/character/hit/hit_06.png',
        'img/character/hit/hit_07.png',
    ];

    IMAGES_DEAD = [
        'img/character/hit/hit_07.png',
        'img/character/hit/hit_06.png',
        'img/character/hit/hit_05.png',
        'img/character/hit/hit_04.png',
        'img/character/hit/hit_03.png',
        'img/character/hit/hit_02.png',
        'img/character/hit/hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_FALL = [
        'img/character/fall.png'
    ];

    IMAGES_HIT = [
        'img/character/hit/hit_01.png',
        'img/character/hit/hit_02.png',
        'img/character/hit/hit_03.png',
        'img/character/hit/hit_04.png',
        'img/character/hit/hit_05.png',
        'img/character/hit/hit_06.png',
        'img/character/hit/hit_07.png',
    ];

    IMAGES_IDLE = [
        'img/character/idle/idle_01.png',
        'img/character/idle/idle_02.png',
        'img/character/idle/idle_03.png',
        'img/character/idle/idle_04.png',
        'img/character/idle/idle_05.png',
        'img/character/idle/idle_06.png',
        'img/character/idle/idle_07.png',
        'img/character/idle/idle_08.png',
        'img/character/idle/idle_09.png',
        'img/character/idle/idle_10.png',
        'img/character/idle/idle_11.png',
    ];

    IMAGES_JUMP = [
        'img/character/jump.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/character/long_idle/long_idle_01.png',
        'img/character/long_idle/long_idle_02.png',
        'img/character/long_idle/long_idle_03.png',
        'img/character/long_idle/long_idle_04.png',
        'img/character/long_idle/long_idle_05.png',
        'img/character/long_idle/long_idle_06.png',
        'img/character/long_idle/long_idle_07.png',
        'img/character/long_idle/long_idle_08.png',
        'img/character/long_idle/long_idle_09.png',
        'img/character/long_idle/long_idle_10.png',
        'img/character/long_idle/long_idle_11.png',
        'img/character/long_idle/long_idle_12.png',
    ];

    IMAGES_RUN = [
        'img/character/run/run_01.png',
        'img/character/run/run_02.png',
        'img/character/run/run_03.png',
        'img/character/run/run_04.png',
        'img/character/run/run_05.png',
        'img/character/run/run_06.png',
        'img/character/run/run_07.png',
        'img/character/run/run_08.png',
        'img/character/run/run_09.png',
        'img/character/run/run_10.png',
        'img/character/run/run_11.png',
        'img/character/run/run_12.png',
    ];

    constructor() {
        super().loadImage("img/character/fall.png");
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_FALL);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_RUN);
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
        this.applyGravity();
        this.animate();
        this.adjustCamera();
        this.countIdlingTime();
        // this.setStoppableInterval(this.countIdlingTime, 1000 / 30);
        // this.setStoppableInterval(this.adjustCamera, 1000 / 60);
    }

    /**
    * This function adjusts the camera to the charactes current position.
    */
    adjustCamera() {
        setInterval(() => {
            if (!this.world.firstBossContact) {
                this.world.cameraX = -this.x + 100;
            }
        }, 1000 / 60);
    }

    /**
    * This function animates the characters movement.
    */
    animateMovement() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
        } else if (this.canMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.canJump()) {
            this.speedY = 12;
            this.isJumping = true;
        }
    }

    /**
    * This function returns true, if the character is able to move right.
    * This is the case, when the right-key/button is pressed and the character did not already reached the level-end-x-coordinate.
    */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x + this.width < this.world.level.levelEndX;
    }

    /**
    * This function returns true, if the character is able to move left.
    * This is the case, when the left-key/button is pressed.
    * Furthermore the character did not already reached the level-start-x-coordinate (or in case of the bossfight, it did not reached the boss-area-start-coordinate).
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && ((!this.world.firstBossContact && this.x > 0) || (this.world.firstBossContact && this.x > 1540));
    }

    /**
    * This function returns true, if the character is able to jump.
    * This is the case, when the up-key/button is pressed and the character is not above the ground and the character is not jumping.
    */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround() && !this.isJumping;
    }

    /**
    * This function stops the characters movement, while the endboss-intro takes place.
    */
    stopMovementEndbossIntro() {
        removeEventListeners();
        setTimeout(() => {
            addEventListeners();
            this.world.bossFightStarted = true;
        }, 3500);
    }

    /**
    * This function animates the characters images for each situation (death, hit, above ground, run, attack, idle).
    */
    animateImages() {
        if (this.isDead()) {
            removeEventListeners();
            world.character.timeIdling = 0;
            return this.animateDeath();
        } else if (this.isHurt) {
            world.character.timeIdling = 0;
            this.playAnimation(this.IMAGES_HIT);
        } else if (this.isAboveGround()) {
            this.airTimeAnimations();
        } else if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
            this.playAnimation(this.IMAGES_RUN);
        } else if (this.world.keyboard.ATTACK) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.isIdling() && !this.isSleeping) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (this.isSleeping) {
            this.playAnimation(this.IMAGES_LONG_IDLE)
        }
    }

    /**
    * This function is part of the animateImages()-function and animates the characters images, if it is above ground.
    * When the character has a positive speedY, the jumping-animation is shown. Otherwise, the falling-animation is shown.
    */
    airTimeAnimations() {
        if (this.speedY > 0) {
            this.playAnimation(this.IMAGES_JUMP);
        } else {
            this.playAnimation(this.IMAGES_FALL);
        }
    }

    /**
    * This function returns true or false, whether the player presses a key or not.
    */
    isIdling() {
        if (this.noKeyIsPressed()) {
            return true;
        }
        return false;
    }

    /**
    * This function returns true, if no key is pressed by the player.
    */
    noKeyIsPressed() {
        return !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.ATTACK;
    }

    /**
    * This function counts up the time the player is not pressing any key. 
    * If 10seconds passed, the character is set to sleeping, the long-idle-animation is played and the according audio is played.
    */
    countIdlingTime() {
        setInterval(() => {
            if (this.timeIdling < 300) {
                this.isSleeping = false;
                this.timeIdling++;
            } else if (this.longIdlingPossible()) {
                playAudio("longIdle");
                return this.isSleeping = true;
            }
        }, 1000 / 30);
    }

    /**
    * This function returns true, if the conditions for the long-idling-animation are fullfilled.
    * This means, the player is alive and the game has not ended jet.
    */
    longIdlingPossible() {
        return this.isAlive && !this.world.gameEndCalled;
    }
}