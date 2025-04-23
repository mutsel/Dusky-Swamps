class BackgroundObject extends MovableObject {
    width;
    height;
    speed;
    category;
    water = 'img/scenery/Swamp_Water.png';
    trees = 'img/scenery/Swamp_Trees.png';
    ground = 'img/scenery/Ground.png';

    constructor(category, x, y) {
        super();
        this.loadImage(this.adjustToCategory(category));
        this.category = category;
        this.y = y;
        this.x = x;
    }

    adjustToCategory(category) {
        switch (category) {
            case "water":
                this.width = 721;
                this.height = 480;
                this.speed = 1;
                return this.water;
            case "trees":
                this.width = 721;
                this.height = 480;
                this.speed = 0.4;
                return this.trees;
            case "ground":
                this.width = 64;
                this.height = 128;
                return this.ground;
        }
    }
} 