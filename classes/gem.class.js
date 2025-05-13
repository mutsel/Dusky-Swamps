class Gem extends MovableObject {
    width = 20;
    height = 25;

    IMAGES_GEMS = [
        'img/collectable_objects/gems/gem_01.png',
        'img/collectable_objects/gems/gem_02.png',
        'img/collectable_objects/gems/gem_03.png',
        'img/collectable_objects/gems/gem_04.png',
        'img/collectable_objects/gems/gem_05.png',
        'img/collectable_objects/gems/gem_06.png',
        'img/collectable_objects/gems/gem_07.png',
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_GEMS[0]);
        this.loadImages(this.IMAGES_GEMS);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
    * This function is used to animate the movable Object
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GEMS);
        }, 1000 / 12)
    }
}