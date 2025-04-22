class Gem extends MovableObject {
    width = 20;
    height = 25;

    IMAGES = [
        'img/gems/Gem_01.png',
        'img/gems/Gem_02.png',
        'img/gems/Gem_03.png',
        'img/gems/Gem_04.png',
        'img/gems/Gem_05.png',
        'img/gems/Gem_06.png',
        'img/gems/Gem_07.png',
    ]

    constructor (x, y) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000 / 12)
    }
}