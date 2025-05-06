class Frog extends MovableObject {
    width = 30;
    height = 35;
    y = 254 - this.height;
    walkLeft = true;

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

    constructor() {
        super().loadImage("img/enemies/frog/run/Run_01.png");
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_RUN);

        this.x = 460 + Math.random() * 252;
        this.speed = 0.5 + Math.random() * 0.3;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.walkLeft) {
                if (this.x <= 470) {
                    this.walkLeft = false;
                }
                this.moveLeft();
                this.otherDirection = false;
            } else {
                if (this.x >= 706 - this.width) {
                    return this.walkLeft = true;
                }
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 60)

        setInterval(() => {
            if (this.isHurt) {
                this.playAnimation(this.IMAGES_HIT);
            } else {
                this.playAnimation(this.IMAGES_RUN);
            }
        }, 1000 / 20)
    }
}