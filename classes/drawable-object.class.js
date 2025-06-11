class DrawableObject {
    x = 0;
    y = 0;
    width = 80;
    height = 80;
    img;
    imageCache = [];
    currentImage = 0;
    currentWidth = 0;

    constructor() { }

    /**
     * This function creates an image from a given image-path
     * 
     * @param {string} path - the path of a single image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function adds each image in the imageCache (from the image-paths in the given array)
     */
    loadImages(imageTypes = ["IMAGES"]) {
        imageTypes.forEach(key => {
            this[key].forEach(path => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        });
    }

    /**
     * This function draws the image on the canvas in its current position and with its current shape.
     * 
     * @param {string} ctx - the context, where the image should be drawn 
     */
    draw(ctx) {
        try { ctx.drawImage(this.img, this.x, this.y, this.width, this.height) }
        catch (error) { return }
    }
}