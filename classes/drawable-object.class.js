class DrawableObject {
    x = 0;
    y = 0;
    width = 80; 
    height = 80;
    img;
    imageCache = [];
    currentImage = 0;

    constructor () {}

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
     * 
     * @param {Array} arr - the array with all the available images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * This function draws the image on the canvas in its current position and with its current shape.
     * 
     * @param {string} ctx - the context, where the image should be drawn 
     */ 
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * For test purposes only!
     * This function draws a frame around each movable Object with collision.
     * 
     * @param {string} ctx - the context, where the frame should be drawn 
     */  
    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Cactus || this instanceof Frog|| this instanceof Endboss) {
        //     ctx.beginPath();
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.lineWidth = '3';
        //     ctx.strokeStyle = 'darkblue';
        //     ctx.stroke();

        //     ctx.beginPath();
        //     ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
        //     ctx.lineWidth = '1';
        //     ctx.strokeStyle = 'red';
        //     ctx.stroke();
        // }
    }
}