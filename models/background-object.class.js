/**
 * backgroundobjects(images) class
 */
class BackgroundObject extends DrawableObject{
    width = 1440;
    height = 480;


    /**
     * constructor to create object, gives object its image and position in canvas
     * @param {string} imagePath - path to it's images
     * @param {number} x - x position
     * @param {number} y - y position
     */
    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}