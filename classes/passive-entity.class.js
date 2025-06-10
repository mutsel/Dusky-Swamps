class PassiveEntity extends MovableObject {
    width = 40;
    height = 20;

    IMAGES = [
        'img/scenery/passive_entities/crow_01.png',
        'img/scenery/passive_entities/crow_02.png',
        'img/scenery/passive_entities/crow_03.png',
        'img/scenery/passive_entities/crow_04.png',
        'img/scenery/passive_entities/crow_05.png',
        'img/scenery/passive_entities/crow_06.png',
    ];

    constructor(x) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages();
        this.x = x + Math.random() * 300;
        this.y = 50 + Math.random() * 200;
        this.speed = 0.8;
    }

    /**
    * This function is used to animate the passive entities movement
    */
    animateMovement() { 
        if (!world.gamePaused) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
    * This function is used to animate the passive entities images
    */
    animateImages() { if (!world.gamePaused) this.playAnimation(this.IMAGES); }
}