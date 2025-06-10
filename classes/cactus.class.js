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
        'img/enemies/cactus/hit/hit_05.png',
        'img/enemies/cactus/hit/hit_04.png',
        'img/enemies/cactus/hit/hit_03.png',
        'img/enemies/cactus/hit/hit_02.png',
        'img/enemies/cactus/hit/hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/cactus/hit/hit_01.png',
        'img/enemies/cactus/hit/hit_02.png',
        'img/enemies/cactus/hit/hit_03.png',
        'img/enemies/cactus/hit/hit_04.png',
        'img/enemies/cactus/hit/hit_05.png',
    ];
 
    IMAGES_IDLE = [
        'img/enemies/cactus/idle/idle_01.png',
        'img/enemies/cactus/idle/idle_02.png',
        'img/enemies/cactus/idle/idle_03.png',
        'img/enemies/cactus/idle/idle_04.png',
        'img/enemies/cactus/idle/idle_05.png',
        'img/enemies/cactus/idle/idle_06.png',
        'img/enemies/cactus/idle/idle_07.png',
        'img/enemies/cactus/idle/idle_08.png',
        'img/enemies/cactus/idle/idle_09.png',
        'img/enemies/cactus/idle/idle_10.png',
        'img/enemies/cactus/idle/idle_11.png',
    ];


    IMAGES_RUN = [
        'img/enemies/cactus/run/run_01.png',
        'img/enemies/cactus/run/run_02.png',
        'img/enemies/cactus/run/run_03.png',
        'img/enemies/cactus/run/run_04.png',
        'img/enemies/cactus/run/run_05.png',
        'img/enemies/cactus/run/run_06.png',
        'img/enemies/cactus/run/run_07.png',
        'img/enemies/cactus/run/run_08.png',
        'img/enemies/cactus/run/run_09.png',
        'img/enemies/cactus/run/run_10.png',
        'img/enemies/cactus/run/run_11.png',
        'img/enemies/cactus/run/run_12.png',
    ];

    imageTypes = ["IMAGES_DEAD", "IMAGES_HIT", "IMAGES_IDLE", "IMAGES_RUN"];

    constructor(x, y, leftBorder, rightBorder) {
        super().loadImage("img/enemies/cactus/run/run_01.png");
        super.loadImages(this.imageTypes);
        this.deathAnimationCounter = this.IMAGES_DEAD.length;
        this.x = x + Math.random() * 100;
        this.y = y;
        this.speed = 3.5;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
    } 

    /**
    * This function animates the cactus movement.
    * The cactus only moves, if the character is inside its range.
    * The cactus changes direction and runs in the opposite direction, if the character is behind him.
    */
    async animateMovement() {
        if (this.canMove()) {
            if (!this.characterNoticed) return await this.animateNoticeCharacter();
            setTimeout(() => {
                if (this.characterIsOnTheLeftHandSide()) this.animateMovementLeft();
                else if (this.characterIsOnThRightHandSide()) this.animateMovementRight();
                else this.playAnimation(this.IMAGES_IDLE);
            }, 400);
        }
    }

    /**
    * This function returns true, if the cactus is able to move (the game is not paused, the cactus is not dead and the charcter is nearby).
    */
    canMove() { return !world.gamePaused && this.characterNearby && !this.isDead(); }

    /**
    * This function checkes if the cactus already noticed the character.
    * If not, the according audio is played.
    */ 
    async animateNoticeCharacter() {
        if (!this.characterNoticed) {
            playAudio("cactusNoticedCharacter");
            this.speedY = 1;
            setTimeout(() => { return this.characterNoticed = true; }, 400);
        }
    }

    /**
    * This function animates the cactus movement if the character is to its left.
    * The cactus walks left until it reaches its left border.
    */
    animateMovementLeft() {
        if (this.x > this.leftBorder) {
            setTimeout(() => {
                this.moveLeft();
                this.otherDirection = false;
            }, 100);
        }
    }

    /**
    * This function animates the cactus movement if the character is to its right.
    * The cactus walks right until it reaches its tight border.
    */
    animateMovementRight() {
        if (this.x + this.width < this.rightBorder) {
            setTimeout(() => {
                this.moveRight();
                this.otherDirection = true;
            }, 100);
        }
    }

    /**
    * This function animates the cactus images for each situation (death, hit, run, idle).
    */
    animateImages() {
        if (!world.gamePaused) {
            if (this.isDead()) return this.animateDeath();
            else if (this.isHurt) this.playAnimation(this.IMAGES_HIT);
            else if (this.characterNearby) this.playAnimation(this.IMAGES_RUN);
            else this.playAnimation(this.IMAGES_IDLE);
        }
    }
}