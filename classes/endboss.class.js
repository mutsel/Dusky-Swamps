class Endboss extends MovableObject {
    width = 80;
    height = 80;
    x = 2400;
    y = 300;
    speed = 9;
    energy = 250;
    a;
    b;
    attackFired = false;

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

    IMAGES_INTRO_ATTACK = [
        'img/enemies/endboss/intro_attack/intro_attack_01.png',
        'img/enemies/endboss/intro_attack/intro_attack_02.png',
        'img/enemies/endboss/intro_attack/intro_attack_03.png',
        'img/enemies/endboss/intro_attack/intro_attack_04.png',
        'img/enemies/endboss/intro_attack/intro_attack_05.png',
        'img/enemies/endboss/intro_attack/intro_attack_06.png',
        'img/enemies/endboss/intro_attack/intro_attack_07.png',
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

    imageTypes = ["IMAGES_ATTACK", "IMAGES_DEAD", "IMAGES_HIT", "IMAGES_IDLE", "IMAGES_INTRO_ATTACK", "IMAGES_RUN"];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        super.loadImages(this.imageTypes);
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
        this.attackFired = false;
    }

    /**
    * This function is used to execude the endboss animations.
    * a is the counter for the intro-animation.
    * b is the counter for the behavior-animation.
    */
    animateEndboss() {
        if (world.gamePaused) return audios.creakingSteps.pause();
        else if (this.a < 43) this.animateIntro();
        else if (this.isAlive) this.animateImages();
        this.a++;
        if (this.bossfightStarted()) this.prepareBossfight();
    }

    /**
    * This function returns true, if the character crosses the border to the boss area and the bossfight did not already started.
    */
    bossfightStarted() { return world.character.x > 1620 && !world.firstBossContact; }

    /**
    * This function sets the game, endboss and character in the bossfight-mode by adjusting variables and executing functions.
    */
    prepareBossfight() {
        this.a = 0;
        this.b = 0;
        world.firstBossContact = true;
        world.character.stopMovementEndbossIntro();
        adjustLoopSounds();
    }

    /**
    * This function animates the endboss-intro-scene.
    */
    animateIntro() {
        if (this.a < 36) {
            playAudio("creakingSteps");
            this.moveLeft();
            this.playAnimation(this.IMAGES_RUN);
        } else {
            this.playAnimation(this.IMAGES_INTRO_ATTACK);
            if (this.a == 39) this.createCanonballAttack();
        }
    }

    /**
    * This function animates the endboss images for each situation (death, hit, idle, normal behavior).
    */
    animateImages() {
        if (this.isDead()) return this.animateDeath();
        else if (this.isHurt) this.playAnimation(this.IMAGES_HIT);
        else if (this.energy == 250) {
            audios.creakingSteps.pause();
            this.playAnimation(this.IMAGES_IDLE);
        } else this.animateBehavior();
    }

    /**
    * This function animates the endboss-behavior. 
    * It moves towards the player and interrupts the movement occasionally to attack.
    */
    animateBehavior() {
        if (this.b < 24) {
            this.animateMovement();
            this.b++;
        } else if (this.b <= 31) {
            audios.creakingSteps.pause();
            this.playAnimation(this.IMAGES_ATTACK);
            this.b++;
        } else {
            this.b = 0;
            this.attackFired = false;
        }
    }

    /**
    * This function animates the endboss movement.
    * The endboss changes direction, if the character is behind him.
    */
    animateMovement() {
        if (this.characterIsOnTheLeftHandSide()) {
            playAudio("creakingSteps");
            this.moveLeft();
            this.otherDirection = false;
            this.playAnimation(this.IMAGES_RUN);
        } else if (this.characterIsOnThRightHandSide()) {
            playAudio("creakingSteps");
            this.moveRight();
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_RUN);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * This function creates the canonball-attack in the 5th attack-animation frame.
     * 
     * @param {number} i - the modulos residual value for the attack-frame
     */
    animateAttack(i) {
        if (i == 5 && !this.attackFired) {
            this.createCanonballAttack();
            this.attackFired = true;
        } else this.attackFired = false
    }

    /**
    * This function creates a new canonball-attack.
    * If the canonball created is part of the intro-animation, it has adjusted physics (it shoots in the air instead of to the character).
    */
    createCanonballAttack() {
        let newCanonballAttack = new CanonballAttack();
        world.canonballAttacks.push(newCanonballAttack);
        if (this.a == 39) {
            newCanonballAttack.y = this.y + 10;
            newCanonballAttack.speedY = 0.8;
            newCanonballAttack.acceleration = 0;
        }
        world.setStoppableInterval(newCanonballAttack.animateMovement, 1000 / 60, newCanonballAttack);
        world.setStoppableInterval(newCanonballAttack.applyGravity, 1000 / 60, newCanonballAttack);
    }
}