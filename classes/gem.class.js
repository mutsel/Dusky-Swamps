class Gem extends MovableObject {
    width = 20;
    height = 25;

    IMAGES_GEMS = [
        'img/collectable-objects/gems/Gem_01.png',
        'img/collectable-objects/gems/Gem_02.png',
        'img/collectable-objects/gems/Gem_03.png',
        'img/collectable-objects/gems/Gem_04.png',
        'img/collectable-objects/gems/Gem_05.png',
        'img/collectable-objects/gems/Gem_06.png',
        'img/collectable-objects/gems/Gem_07.png',
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