class GemsBar extends StatusBar {
    x = 18;
    y = 70;

    IMAGES = [
        'img/gui/statusbars/gems/gems_0.png',
        'img/gui/statusbars/gems/gems_25.png',
        'img/gui/statusbars/gems/gems_50.png',
        'img/gui/statusbars/gems/gems_75.png',
        'img/gui/statusbars/gems/gems_100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}