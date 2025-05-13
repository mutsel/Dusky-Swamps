class MagicStone extends MovableObject {
    width = 20;
    height = 25;

    IMAGES_MAGICSTONES = [
        'img/collectable_objects/magic_stones/magic_stone_01.png',
        'img/collectable_objects/magic_stones/magic_stone_02.png',
        'img/collectable_objects/magic_stones/magic_stone_03.png',
        'img/collectable_objects/magic_stones/magic_stone_04.png',
        'img/collectable_objects/magic_stones/magic_stone_05.png',
        'img/collectable_objects/magic_stones/magic_stone_06.png',
        'img/collectable_objects/magic_stones/magic_stone_07.png',
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_MAGICSTONES[0]);
        this.loadImages(this.IMAGES_MAGICSTONES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
    * This function is used to animate the movable Object
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MAGICSTONES);
        }, 1000 / 12)
    }
}