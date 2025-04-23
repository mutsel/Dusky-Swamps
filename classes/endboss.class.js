class Endboss extends MovableObject {
    width = 80;
    height = 80;
    y = 0 - this.height;
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
    IMAGES_ATTACK = [
        'img/enemies/endboss/Attack/Attack_01.png',
        'img/enemies/endboss/Attack/Attack_02.png',
        'img/enemies/endboss/Attack/Attack_03.png',
        'img/enemies/endboss/Attack/Attack_04.png',
        'img/enemies/endboss/Attack/Attack_05.png',
        'img/enemies/endboss/Attack/Attack_06.png',
        'img/enemies/endboss/Attack/Attack_07.png',
    ];
    IMAGES_HIT = [
        'img/enemies/endboss/Hit/Hit_01.png',
        'img/enemies/endboss/Hit/Hit_02.png',
        'img/enemies/endboss/Hit/Hit_03.png',
        'img/enemies/endboss/Hit/Hit_04.png',
        'img/enemies/endboss/Hit/Hit_05.png',
    ];
    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HIT);
        this.x = 400;
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 1000 / 10);
    }
}