class EndbossHealthBar extends StatusBar {
    x = 0;
    y = 420;
    width = 720;
    height = 21;

    IMAGES = [
        'img/gui/statusbars/endboss/endboss_healthbar_100.png',
        'img/gui/statusbars/endboss/endboss_healthbar_80.png',
        'img/gui/statusbars/endboss/endboss_healthbar_60.png',
        'img/gui/statusbars/endboss/endboss_healthbar_40.png',
        'img/gui/statusbars/endboss/endboss_healthbar_20.png',
        'img/gui/statusbars/endboss/endboss_healthbar_0.png',
    ]

    constructor() {
        super();
        this.loadImages();
        this.setPercentageEndboss(100);
    }

    /**
     * This function sets the percentage of a statusbar and loads the according image of this statusbar.
     * 
     * @param {number} percentage - the fillstate of a statusbar in percent
     */
    setPercentageEndboss(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageCacheEndboss()]
        this.img = this.imageCache[path];
    }

    /**
     * This function returns the index of that image from statusbars images-array, that shows the correct percentage.
     */
    resolveImageCacheEndboss() {
        if (this.percentage == 100) return 0;
        else if (this.percentage == 80) return 1;
        else if (this.percentage == 60) return 2;
        else if (this.percentage == 40) return 3;
        else if (this.percentage == 20) return 4;
        else if (this.percentage == 0) return 5;
    }
}