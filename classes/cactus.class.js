class Cactus extends MovableObject {
    width = 35;
    height = 40;
    y = 385 - this.height;

    IMAGES_DEAD = [
        'img/enemies/cactus/Hit/Hit_05.png',
        'img/enemies/cactus/Hit/Hit_04.png',
        'img/enemies/cactus/Hit/Hit_03.png',
        'img/enemies/cactus/Hit/Hit_02.png',
        'img/enemies/cactus/Hit/Hit_01.png',
        'img/dead-animation-universal/disappearing_01.png',
        'img/dead-animation-universal/disappearing_02.png',
        'img/dead-animation-universal/disappearing_03.png',
        'img/dead-animation-universal/disappearing_04.png',
        'img/dead-animation-universal/disappearing_05.png',
        'img/dead-animation-universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/cactus/Hit/Hit_01.png',
        'img/enemies/cactus/Hit/Hit_02.png',
        'img/enemies/cactus/Hit/Hit_03.png',
        'img/enemies/cactus/Hit/Hit_04.png',
        'img/enemies/cactus/Hit/Hit_05.png',
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

    constructor() {
        super().loadImage("img/enemies/cactus/Run/Run_01.png");
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_RUN);

        this.x = 200 + Math.random() * 400;
        this.speed = 0.2 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        let i = 0;
        setInterval(() => {
            if (this.isDead() && i < 10) {
                this.playAnimation(this.IMAGES_DEAD);
                i++
            } else if (this.isDead()) {
                this.loadImage('img/dead-animation-universal/dead.png');
                world.removeDeadEnemies();
                i = 0;
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HIT);
            } else {
                this.playAnimation(this.IMAGES_RUN);
            }
        }, 1000 / 20)
    }
}