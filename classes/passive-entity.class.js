class PassiveEntity extends MovableObject {
    width = 40;
    height = 20;

    IMAGES_CROW = [
        'img/scenery/passive_entities/crow_01.png',
        'img/scenery/passive_entities/crow_02.png',
        'img/scenery/passive_entities/crow_03.png',
        'img/scenery/passive_entities/crow_04.png',
        'img/scenery/passive_entities/crow_05.png',
        'img/scenery/passive_entities/crow_06.png',
    ];

    constructor(x) {
        super().loadImage(this.IMAGES_CROW[0]);
        this.loadImages(this.IMAGES_CROW);

        this.x = x + Math.random() * 300;
        this.y = 50 + Math.random() * 200;
        this.speed = 0.8;

        this.animate();
    }

    /**
    * This function is used to animate the movable Object (movement and animation)
    */
    animate() {
        setInterval(() => {
            if (!world.gamePaused) {
                this.moveLeft();
                this.otherDirection = true;
            }
        }, 1000 / 30)
        setInterval(() => {
            if (!world.gamePaused) {
                this.playAnimation(this.IMAGES_CROW);
            }
        }, 1000 / 8)
    }
}