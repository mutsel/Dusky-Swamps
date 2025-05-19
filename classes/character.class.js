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
        'img/character/Hit/Hit_03.png',
        'img/character/Hit/Hit_04.png',
        'img/character/Hit/Hit_05.png',
        'img/character/Hit/Hit_06.png',
        'img/character/Hit/Hit_07.png',
    ];

    IMAGES_DEAD = [
        'img/character/Hit/Hit_07.png',
        'img/character/Hit/Hit_06.png',
        'img/character/Hit/Hit_05.png',
        'img/character/Hit/Hit_04.png',
        'img/character/Hit/Hit_03.png',
        'img/character/Hit/Hit_02.png',
        'img/character/Hit/Hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_FALL = [
        'img/character/Fall.png'
    ];

    IMAGES_HIT = [
        'img/character/Hit/Hit_01.png',
        'img/character/Hit/Hit_02.png',
        'img/character/Hit/Hit_03.png',
        'img/character/Hit/Hit_04.png',
        'img/character/Hit/Hit_05.png',
        'img/character/Hit/Hit_06.png',
        'img/character/Hit/Hit_07.png',
    ];

    IMAGES_IDLE = [
        'img/character/Idle/Idle_01.png',
        'img/character/Idle/Idle_02.png',
        'img/character/Idle/Idle_03.png',
        'img/character/Idle/Idle_04.png',
        'img/character/Idle/Idle_05.png',
        'img/character/Idle/Idle_06.png',
        'img/character/Idle/Idle_07.png',
        'img/character/Idle/Idle_08.png',
        'img/character/Idle/Idle_09.png',
        'img/character/Idle/Idle_10.png',
        'img/character/Idle/Idle_11.png',
    ];

    IMAGES_JUMP = [
        'img/character/Jump.png'
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
        'img/character/Run/Run_01.png',
        'img/character/Run/Run_02.png',
        'img/character/Run/Run_03.png',
        'img/character/Run/Run_04.png',
        'img/character/Run/Run_05.png',
        'img/character/Run/Run_06.png',
        'img/character/Run/Run_07.png',
        'img/character/Run/Run_08.png',
        'img/character/Run/Run_09.png',
        'img/character/Run/Run_10.png',
        'img/character/Run/Run_11.png',
        'img/character/Run/Run_12.png',
    ];

    constructor() {
        super().loadImage("img/character/Fall.png");
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
    }

    /**
    * This function animates the characters movement.
    */
    animateMovement() {
        if (this.world.keyboard.RIGHT && this.x + this.width < this.world.level.levelEndX) {
            this.moveRight();
            this.otherDirection = false;
        } else if (this.world.keyboard.LEFT && ((!this.world.firstBossContact && this.x > 0) || (this.world.firstBossContact && this.x > 1540))) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.UP && !this.isAboveGround() && !this.isJumping) {
            this.speedY = 12;
            this.isJumping = true;
        }
    }

    /**
    * This function stops the characters movement, while the endboss-intro takes place.
    */
    stopMovementEndbossIntro() {
        removeEventListeners();
        setTimeout(() => {
            addEventListeners()
        }, 3500);
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
    * This function animates the characters images for each situation (death, hit, above ground, run, attack, idle).
    */
    animateImages() {
        if (this.isDead()) {
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
        if (!this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.ATTACK) {
            return true;
        }
        return false;
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
            } else if (this.isAlive) {
                audios.longIdle.play();
                audios.longIdle.volume = audioVolume;
                return this.isSleeping = true;
            }
        }, 1000 / 30);
    }
}