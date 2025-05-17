class Cactus extends MovableObject {
    width = 35;
    height = 40;
    x;
    y;
    speed;
    leftBorder;
    rightBorder;
    walkLeft = true;
    characterNearby = false;

    IMAGES_DEAD = [
        'img/enemies/cactus/Hit/Hit_05.png',
        'img/enemies/cactus/Hit/Hit_04.png',
        'img/enemies/cactus/Hit/Hit_03.png',
        'img/enemies/cactus/Hit/Hit_02.png',
        'img/enemies/cactus/Hit/Hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/cactus/Hit/Hit_01.png',
        'img/enemies/cactus/Hit/Hit_02.png',
        'img/enemies/cactus/Hit/Hit_03.png',
        'img/enemies/cactus/Hit/Hit_04.png',
        'img/enemies/cactus/Hit/Hit_05.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/cactus/Idle/Idle_01.png',
        'img/enemies/cactus/Idle/Idle_02.png',
        'img/enemies/cactus/Idle/Idle_03.png',
        'img/enemies/cactus/Idle/Idle_04.png',
        'img/enemies/cactus/Idle/Idle_05.png',
        'img/enemies/cactus/Idle/Idle_06.png',
        'img/enemies/cactus/Idle/Idle_07.png',
        'img/enemies/cactus/Idle/Idle_08.png',
        'img/enemies/cactus/Idle/Idle_09.png',
        'img/enemies/cactus/Idle/Idle_10.png',
        'img/enemies/cactus/Idle/Idle_11.png',
    ];


    IMAGES_RUN = [
        'img/enemies/cactus/Run/Run_01.png',
        'img/enemies/cactus/Run/Run_02.png',
        'img/enemies/cactus/Run/Run_03.png',
        'img/enemies/cactus/Run/Run_04.png',
        'img/enemies/cactus/Run/Run_05.png',
        'img/enemies/cactus/Run/Run_06.png',
        'img/enemies/cactus/Run/Run_07.png',
        'img/enemies/cactus/Run/Run_08.png',
        'img/enemies/cactus/Run/Run_09.png',
        'img/enemies/cactus/Run/Run_10.png',
        'img/enemies/cactus/Run/Run_11.png',
        'img/enemies/cactus/Run/Run_12.png',
    ];

    constructor(x, y, leftBorder, rightBorder) {
        super().loadImage("img/enemies/cactus/Run/Run_01.png");
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_RUN);
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
        this.x = x + Math.random() * 100;
        this.y = y - this.height;
        this.speed = 4;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.animate();
    }

    /**
    * This function animates the cactus movement.
    * The cactus only moves, if the character is inside its range.
    * The cactus changes direction and runs in the opposite direction, if the character is behind him.
    */
    animateMovement() {
        if (world.character.x + world.character.width > this.leftBorder && world.character.x < this.rightBorder) {
            if (world.character.x + world.character.width < this.x) {
                if (this.x > this.leftBorder) {
                    this.moveLeft();
                    this.otherDirection = false;
                }
            } else if (world.character.x > this.x + this.width) {
                if (this.x + this.width < this.rightBorder) {
                    this.moveRight();
                    this.otherDirection = true;
                }
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }

    /**
    * This function animates the cactus images for each situation (death, hit, run, idle).
    */
    animateImages() {
        if (this.isDead()) {
            return this.animateDeath();
        } else if (this.isHurt) {
            this.playAnimation(this.IMAGES_HIT);
        } else if (this.characterNearby) {
            this.playAnimation(this.IMAGES_RUN);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }

    }
}