/**
 * collectable object class
 */
class CollectableObject extends MovableObject {

    y = 290;

    /**
     * constructor creates collectabale object with a random x position
     */
    constructor() {
        super();
        this.x = Math.floor(Math.random() * (3600 - 600 + 1)) + 600;
    }

}