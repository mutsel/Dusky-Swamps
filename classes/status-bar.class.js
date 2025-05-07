class StatusBar extends DrawableObject {
    width = 110.4;
    height = 21.6;
    percentage = 100;

    constructor() {
        super();
        // this.loadImages(this.ICONS);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageCache()]
        this.img = this.imageCache[path];
    } 

    resolveImageCache() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage == 75) {
            return 1;
        } else if (this.percentage == 50) {
            return 2;
        } else if (this.percentage == 25) {
            return 3;
        } else if (this.percentage == 0) {
            return 4;
        }
    }
}