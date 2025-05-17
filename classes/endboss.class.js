class Endboss extends MovableObject {
    width = 80;
    height = 80;
    x = 2400;
    y = 0 - this.height;
    speed = 9;
    energy = 250;
    b;
    i;

    IMAGES_ATTACK = [
        'img/enemies/endboss/Attack/Attack_01.png',
        'img/enemies/endboss/Attack/Attack_02.png',
        'img/enemies/endboss/Attack/Attack_03.png',
        'img/enemies/endboss/Attack/Attack_04.png',
        'img/enemies/endboss/Attack/Attack_05.png',
        'img/enemies/endboss/Attack/Attack_06.png',
        'img/enemies/endboss/Attack/Attack_07.png',
    ];

    IMAGES_DEAD = [
        'img/enemies/endboss/Hit/Hit_05.png',
        'img/enemies/endboss/Hit/Hit_04.png',
        'img/enemies/endboss/Hit/Hit_03.png',
        'img/enemies/endboss/Hit/Hit_02.png',
        'img/enemies/endboss/Hit/Hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/endboss/Hit/Hit_01.png',
        'img/enemies/endboss/Hit/Hit_02.png',
        'img/enemies/endboss/Hit/Hit_03.png',
        'img/enemies/endboss/Hit/Hit_04.png',
        'img/enemies/endboss/Hit/Hit_05.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/endboss/Idle/Idle_01.png',
        'img/enemies/endboss/Idle/Idle_02.png',
        'img/enemies/endboss/Idle/Idle_03.png',
        'img/enemies/endboss/Idle/Idle_04.png',
        'img/enemies/endboss/Idle/Idle_05.png',
        'img/enemies/endboss/Idle/Idle_06.png',
        'img/enemies/endboss/Idle/Idle_07.png',
        'img/enemies/endboss/Idle/Idle_08.png',
        'img/enemies/endboss/Idle/Idle_09.png',
        'img/enemies/endboss/Idle/Idle_10.png',
        'img/enemies/endboss/Idle/Idle_11.png',
    ];

    IMAGES_RUN = [
        'img/enemies/endboss/Run/Walk_01.png',
        'img/enemies/endboss/Run/Walk_02.png',
        'img/enemies/endboss/Run/Walk_03.png',
        'img/enemies/endboss/Run/Walk_04.png',
        'img/enemies/endboss/Run/Walk_05.png',
        'img/enemies/endboss/Run/Walk_06.png',
        'img/enemies/endboss/Run/Walk_07.png',
        'img/enemies/endboss/Run/Walk_08.png',
        'img/enemies/endboss/Run/Walk_09.png',
        'img/enemies/endboss/Run/Walk_10.png',
        'img/enemies/endboss/Run/Walk_11.png',
        'img/enemies/endboss/Run/Walk_12.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_RUN);
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
        this.applyGravity();
        this.animateEndboss();
    }

    /**
    * This function is used to execude the endboss animations.
    * i is the counter for the intro-animation.
    * b is the counter for the behavior-animation.
    */
    animateEndboss() {
        setInterval(() => {
            if (this.i < 42) {
                this.animateIntro();
            } else {
                if (this.isAlive) {
                    this.animateImages();
                }
            }
            this.i++
            if (world.character.x > 1620 && !world.firstBossContact) {
                this.i = 0;
                this.b = 0;
                world.firstBossContact = true;
                adjustLoopSounds();
            }
        }, 1000 / 12);
    }

    /**
    * This function animates the endboss-intro-scene (it walks in and shoots one time).
    */
    animateIntro() {
        if (this.i < 36) {
            this.moveLeft();
            this.playAnimation(this.IMAGES_RUN);
        } else if (world.firstBossContact) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
    * This function animates the endboss images for each situation (death, hit, idle, normal behavior).
    */
    animateImages() {
        if (this.isDead()) {
            return this.animateDeath();
        } else if (this.isHurt) {
            this.playAnimation(this.IMAGES_HIT);
            this.b++
        } else if (this.energy == 250) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.animateBehavior();
        }
    }

    /**
    * This function animates the endboss-behavior. 
    * It moves towards the player and interrupts the movement occasionally to attack.
    */
    animateBehavior() {
        if (this.b < 24) {
            this.animateMovement();
            return this.b++
        } else {
            if (this.b > 31) {
                return this.b = 0;
            } else {
                if (world.firstBossContact) {
                    this.playAnimation(this.IMAGES_ATTACK);
                }
                return this.b++
            }
        }
    }

    /**
    * This function animates the endboss movement.
    * The endboss changes direction and runs in the opposite direction, if the character is behind him.
    */
    animateMovement() {
        if (world.character.x + world.character.width < this.x) {
            this.moveLeft();
            this.otherDirection = false;
            this.playAnimation(this.IMAGES_RUN);
        } else if (world.character.x > this.x + this.width) {
            this.moveRight();
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_RUN);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
}