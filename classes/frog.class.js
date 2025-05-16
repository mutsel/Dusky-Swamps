class Frog extends MovableObject {
    width = 31.5;
    height = 35;
    x;
    y;
    speed;
    leftBorder;
    rightBorder;
    walkLeft = true;
    widths = [31.5, 31.5, 30, 30, 90, 90, 66, 37.5];
    characterNearby = false;
    attackArea = 80;

    IMAGES_ATTACK = [
        'img/enemies/frog/attack/Attack_01.png',
        'img/enemies/frog/attack/Attack_02.png',
        'img/enemies/frog/attack/Attack_03.png',
        'img/enemies/frog/attack/Attack_04.png',
        'img/enemies/frog/attack/Attack_05.png',
        'img/enemies/frog/attack/Attack_06.png',
        'img/enemies/frog/attack/Attack_07.png',
        'img/enemies/frog/attack/Attack_08.png',
    ];

    IMAGES_DEAD = [
        'img/enemies/frog/hit/Hit_05.png',
        'img/enemies/frog/hit/Hit_04.png',
        'img/enemies/frog/hit/Hit_03.png',
        'img/enemies/frog/hit/Hit_02.png',
        'img/enemies/frog/hit/Hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/frog/hit/Hit_01.png',
        'img/enemies/frog/hit/Hit_02.png',
        'img/enemies/frog/hit/Hit_03.png',
        'img/enemies/frog/hit/Hit_04.png',
        'img/enemies/frog/hit/Hit_05.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/frog/idle/Idle_01.png',
        'img/enemies/frog/idle/Idle_02.png',
        'img/enemies/frog/idle/Idle_03.png',
        'img/enemies/frog/idle/Idle_04.png',
        'img/enemies/frog/idle/Idle_05.png',
        'img/enemies/frog/idle/Idle_06.png',
        'img/enemies/frog/idle/Idle_07.png',
        'img/enemies/frog/idle/Idle_08.png',
        'img/enemies/frog/idle/Idle_09.png',
        'img/enemies/frog/idle/Idle_10.png',
        'img/enemies/frog/idle/Idle_11.png',
    ];

    IMAGES_RUN = [
        'img/enemies/frog/run/Run_01.png',
        'img/enemies/frog/run/Run_02.png',
        'img/enemies/frog/run/Run_03.png',
        'img/enemies/frog/run/Run_04.png',
        'img/enemies/frog/run/Run_05.png',
        'img/enemies/frog/run/Run_06.png',
        'img/enemies/frog/run/Run_07.png',
        'img/enemies/frog/run/Run_08.png',
        'img/enemies/frog/run/Run_09.png',
        'img/enemies/frog/run/Run_10.png',
        'img/enemies/frog/run/Run_11.png',
        'img/enemies/frog/run/Run_12.png',
    ];

    constructor(x, y, leftBorder, rightBorder) {
        super().loadImage("img/enemies/frog/run/Run_01.png");
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_RUN);
        this.x = x + Math.random() * 252;
        this.y = y - this.height;
        this.speed = 0.5 + Math.random() * 0.3;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
        this.animateImages();
        this.animateMovement();
    }

    /**
    * This function is used to animate the images of the frogs
    */
    animateImages() {
        setInterval(() => {
            if (this.alive) {
                if (this.isDead()) {
                    this.width = 31.5;
                    this.animateDeath();
                    return;
                } else if (this.isHurt) {
                    this.width = 31.5;
                    this.playAnimation(this.IMAGES_HIT);
                }
                else if (this.characterNearby) {
                    this.animateAttack();
                } else {
                    this.width = 31.5;
                    this.playAnimation(this.IMAGES_RUN);
                }
            }
        }, 1000 / 10)
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

    /**
    * This function animates the frogs movement. The frog changes direction, if the character is behind him or if it reaches the movement-border.
    */
    animateMovement() {
        setInterval(() => {
            if (this.walkLeft) {
                if (this.x <= this.leftBorder
                    || (this.characterNearby && world.character.x > this.x + this.width)) {
                    return this.walkLeft = false;
                }
                this.moveLeft();
                this.otherDirection = false;
            } else {
                if (this.x >= this.rightBorder - this.width
                    || (this.characterNearby && world.character.x < this.x)) {
                    return this.walkLeft = true;
                }
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 50)
    }
}