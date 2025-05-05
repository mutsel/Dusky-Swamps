class DrawableObject {
    x = 0;
    y = 0;
    width = 80; 
    height = 80;
    img;
    imageCache = [];
    currentImage = 0;

    constructor () {
        // console.log(3)
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Cactus || this instanceof Frog|| this instanceof Endboss) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'darkblue';
            ctx.stroke();

            ctx.beginPath();
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
    }
}