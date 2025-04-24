class MagicStone extends MovableObject {
    width = 20;
    height = 25;

    IMAGES_MAGICSTONES = [
        'img/collectable-objects/magic-stones/MagicStone_01.png',
        'img/collectable-objects/magic-stones/MagicStone_02.png',
        'img/collectable-objects/magic-stones/MagicStone_03.png',
        'img/collectable-objects/magic-stones/MagicStone_04.png',
        'img/collectable-objects/magic-stones/MagicStone_05.png',
        'img/collectable-objects/magic-stones/MagicStone_06.png',
        'img/collectable-objects/magic-stones/MagicStone_07.png',
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_MAGICSTONES[0]);
        this.loadImages(this.IMAGES_MAGICSTONES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MAGICSTONES);
        }, 1000 / 12)
    }
}