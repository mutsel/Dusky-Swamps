class CollectableObject extends MovableObject {
    width = 20;
    height = 25;
    type;
    isAvailable = true;

    IMAGES_GEM = [
        'img/collectable_objects/gems/gem_01.png',
        'img/collectable_objects/gems/gem_02.png',
        'img/collectable_objects/gems/gem_03.png',
        'img/collectable_objects/gems/gem_04.png',
        'img/collectable_objects/gems/gem_05.png',
        'img/collectable_objects/gems/gem_06.png',
        'img/collectable_objects/gems/gem_07.png',
    ];

    IMAGES_MAGICSTONE = [
        'img/collectable_objects/magic_stones/magic_stone_01.png',
        'img/collectable_objects/magic_stones/magic_stone_02.png',
        'img/collectable_objects/magic_stones/magic_stone_03.png',
        'img/collectable_objects/magic_stones/magic_stone_04.png',
        'img/collectable_objects/magic_stones/magic_stone_05.png',
        'img/collectable_objects/magic_stones/magic_stone_06.png',
        'img/collectable_objects/magic_stones/magic_stone_07.png',
    ];

    constructor(type, x, y) {
        super();
        this.type = type;
        this.loadImage(this.getImages()[0]);
        this.loadImages(this.getImages());
        this.x = x;
        this.y = y;
        this.animate();
    }

    getImages() {
        if (this.type == "gem") {
            return this.IMAGES_GEM;
        } else if (this.type == "magicStone") {
            return this.IMAGES_MAGICSTONE;
        }
    }

    /**
    * This function is used to animate collectable Object
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.getImages());
        }, 1000 / 12)
    }
}