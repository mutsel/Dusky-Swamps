class GemsBar extends StatusBar {
    x = 18;
    y = 70;

    IMAGES = [
        'img/GUI/statusbars/Gems_0.png',
        'img/GUI/statusbars/Gems_25.png',
        'img/GUI/statusbars/Gems_50.png',
        'img/GUI/statusbars/Gems_75.png',
        'img/GUI/statusbars/Gems_100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}