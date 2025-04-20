class Cactus extends MovableObject {
    width = 30;
    height = 35;
    y = 385-this.height;

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

    constructor() {
        super().loadImage("img/enemies/cactus/Run/Run_01.png");
        this.loadImages(this.IMAGES_RUN);

        this.x = 200 + Math.random() * 400;
        this.speed = 0.2 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        setInterval(() => {
            this.playAnimation(this.IMAGES_RUN);
        }, 1000 / 20)
    }
}