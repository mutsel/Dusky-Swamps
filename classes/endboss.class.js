class Endboss extends MovableObject {
    width = 80;
    height = 80;
    y = 385-this.height;
    
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

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
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