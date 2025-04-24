class GemsBar extends StatusBar {
    x = 20;
    y = 60;

    IMAGES = [
        'img/GUI/Gems_0.png',
        'img/GUI/Gems_25.png',
        'img/GUI/Gems_50.png',
        'img/GUI/Gems_75.png',
        'img/GUI/Gems_100.png',
    ];

    // icon = 'img/GUI/Gems.png';

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        // this.loadImage(this.icon);
        this.setPercentage(100);
    }
}