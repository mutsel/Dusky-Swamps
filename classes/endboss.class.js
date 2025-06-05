class Endboss extends MovableObject {
    width = 80;
    height = 80;
    x = 2400;
    y = 300;
    speed = 9;
    energy = 250;
    b;
    i;

    IMAGES_ATTACK = [
        'img/enemies/endboss/attack/attack_01.png',
        'img/enemies/endboss/attack/attack_02.png',
        'img/enemies/endboss/attack/attack_03.png',
        'img/enemies/endboss/attack/attack_04.png',
        'img/enemies/endboss/attack/attack_05.png',
        'img/enemies/endboss/attack/attack_06.png',
        'img/enemies/endboss/attack/attack_07.png',
    ];

    IMAGES_DEAD = [
        'img/enemies/endboss/hit/hit_05.png',
        'img/enemies/endboss/hit/hit_04.png',
        'img/enemies/endboss/hit/hit_03.png',
        'img/enemies/endboss/hit/hit_02.png',
        'img/enemies/endboss/hit/hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/endboss/hit/hit_01.png',
        'img/enemies/endboss/hit/hit_02.png',
        'img/enemies/endboss/hit/hit_03.png',
        'img/enemies/endboss/hit/hit_04.png',
        'img/enemies/endboss/hit/hit_05.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/endboss/idle/idle_01.png',
        'img/enemies/endboss/idle/idle_02.png',
        'img/enemies/endboss/idle/idle_03.png',
        'img/enemies/endboss/idle/idle_04.png',
        'img/enemies/endboss/idle/idle_05.png',
        'img/enemies/endboss/idle/idle_06.png',
        'img/enemies/endboss/idle/idle_07.png',
        'img/enemies/endboss/idle/idle_08.png',
        'img/enemies/endboss/idle/idle_09.png',
        'img/enemies/endboss/idle/idle_10.png',
        'img/enemies/endboss/idle/idle_11.png',
    ];

    IMAGES_RUN = [
        'img/enemies/endboss/run/walk_01.png',
        'img/enemies/endboss/run/walk_02.png',
        'img/enemies/endboss/run/walk_03.png',
        'img/enemies/endboss/run/walk_04.png',
        'img/enemies/endboss/run/walk_05.png',
        'img/enemies/endboss/run/walk_06.png',
        'img/enemies/endboss/run/walk_07.png',
        'img/enemies/endboss/run/walk_08.png',
        'img/enemies/endboss/run/walk_09.png',
        'img/enemies/endboss/run/walk_10.png',
        'img/enemies/endboss/run/walk_11.png',
        'img/enemies/endboss/run/walk_12.png',
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
        // const endbossAnimationInterval = 
        setInterval(() => {
            if (!world.gamePaused) {
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
                    world.character.stopMovementEndbossIntro();
                    adjustLoopSounds();
                }
            } else {audios.creakingSteps.pause();}
        }, 1000 / 12);
        // world.intervals.push(endbossAnimationInterval);
    }


    /**
    * This function animates the endboss-intro-scene (it walks in and shoots one time).
    */
    animateIntro() {
        if (this.i < 36) {
            playAudio("creakingSteps");
            this.moveLeft();
            this.playAnimation(this.IMAGES_RUN);
        } else {
            audios.creakingSteps.pause();
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
    * This function animates the endboss images for each situation (death, hit, idle, normal behavior).
    */
    animateImages() {
        if (this.isDead()) {
            this.speed = 0;
            return this.animateDeath();
        } else if (this.isHurt) {
            this.playAnimation(this.IMAGES_HIT);
            this.b++
        } else if (this.energy == 250) {
            audios.creakingSteps.pause();
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
                audios.creakingSteps.pause();
                this.playAnimation(this.IMAGES_ATTACK);
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
            playAudio("creakingSteps");
            this.moveLeft();
            this.otherDirection = false;
            this.playAnimation(this.IMAGES_RUN);
        } else if (world.character.x > this.x + this.width) {
            playAudio("creakingSteps");
            this.moveRight();
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_RUN);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
}