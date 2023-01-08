/**
 * drawableobject class
 */
class DrawableObject {
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;

    /**
     * function to set image of the drawable object
     * @param {path} path - path of image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * loads images from an array into the imagespath json with the key beeing the path
     * @param {Array} imagepaths - filled with paths from images 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        });
    }

    /**
     * draws image in canvas
     * @param {Context} ctx - context of canvas 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}