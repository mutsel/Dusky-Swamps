class BackgroundObject extends MovableObject {
    width;
    height;
    speed;
    category;
    water = 'img/scenery/swamp_water.png';
    trees = 'img/scenery/swamp_trees.png';
    ground = 'img/scenery/ground.png';

    constructor(category, x, y) {
        super();
        this.loadImage(this.adjustToCategory(category));
        this.category = category;
        this.y = y;
        this.x = x;
    }

    /**
     * This function adjusts width, height and the image-path to each background-object according to its category
     * 
     * @param {string} category - the type of the background-object (water, trees, ground)
     */
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