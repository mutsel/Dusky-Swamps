class Cactus extends MovableObject {
    width = 35;
    height = 40;
    x;
    y;
    speed;
    leftBorder;
    rightBorder;
    characterNearby = false;
    characterNoticed = false;
    acceleration = 1;

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
        this.y = y;
        this.speed = 4;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.applyGravity();
        this.animate();
    }
 
    /**
    * This function animates the cactus movement.
    * The cactus only moves, if the character is inside its range.
    * The cactus changes direction and runs in the opposite direction, if the character is behind him.
    */
    async animateMovement() {
        if (this.characterNearby && !this.isDead()) {
            if (this.characterNoticed == false) {
                await this.animateNoticeCharacter();
            }
            setTimeout(() => {
                if (world.character.x + world.character.width < this.x) {
                    this.animateMovementLeft();
                } else if (world.character.x > this.x + this.width) {
                    this.animateMovementRight();
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }, 400); 
        }
    }

    /**
    * This function checkes if the cactus already noticed the character.
    * If not, the according audio is played.
    */
    async animateNoticeCharacter() {
        if (!this.characterNoticed) {
            audios.cactusNoticedCharacter.play();
            audios.cactusNoticedCharacter.volume = audioVolume;
            this.speedY = 1;
            setTimeout(() => {
                return this.characterNoticed = true;
            }, 400); 
        }
    }

    /**
    * This function animates the cactus movement if the character is to its left.
    * The cactus walks left until it reaches its left border.
    */
    animateMovementLeft() {
        if (this.x > this.leftBorder) {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /**
    * This function animates the cactus movement if the character is to its right.
    * The cactus walks right until it reaches its tight border.
    */
    animateMovementRight() {
        if (this.x + this.width < this.rightBorder) {
            this.moveRight();
            this.otherDirection = true;
        }
    }

    /**
    * This function animates the cactus images for each situation (death, hit, run, idle).
    */
    animateImages() {
        if (this.isDead()) {
            this.speed = 0;
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