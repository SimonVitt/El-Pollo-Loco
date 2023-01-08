/**
 * hitbox class
 */
class Hitbox extends MovableObject{
    x;
    y;
    height;
    width;

    /**
     * creates hitbox and sets its position and size
     * @param {number} x - yposition of hitbox
     * @param {number} y - xposition of hitbox
     * @param {number} height - height of hitbox
     * @param {number} width - width of hitbox
     */
    constructor(x, y, height, width){
        super();
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    /**
     * updates position of hitbox
     * @param {number} x - yposition of hitbox
     * @param {number} y - xposition of hitbox
     */
    updateHitbox(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * enables hitbox, so it cant get hit or hit anything anymore
     */
    enableHitbox(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
}