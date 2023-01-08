/**
 * movableobject class
 */
class MovableObject extends DrawableObject {

    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    gravityInterval;

    /**
     * applies gravity to objects, so that objects above ground fall
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            } else{
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * checks if object is above ground
     * @returns {boolean} - true when object is above ground
     */
    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true;
        }else{
            return this.y < 150;   
        }
    }

    /**
     * checks if the caller of the function and mo hitboxes are colliding
     * @param {Object} mo - any movableobject 
     * @returns {boolean} - true, if caller collides with mo
     */
    isColliding(mo) {
        return this.hitbox.x + this.hitbox.width > mo.hitbox.x &&
            this.hitbox.y + this.hitbox.height > mo.hitbox.y &&
            this.hitbox.x < mo.hitbox.x + mo.hitbox.width &&
            this.hitbox.y < mo.hitbox.y + mo.hitbox.height;
    }

    /**
     * checks if the caller of the functions bottom y and mo hitboxes are colliding
     * @param {Object} mo - any movableobject 
     * @returns {boolean} - true, if caller collides with mo from top
     */
    checkCollisionTop(mo){
        return this.hitbox.x + this.hitbox.width > mo.hitbox.x &&
            this.y + this.height > mo.hitbox.y &&
            this.hitbox.x < mo.hitbox.x + mo.hitbox.width &&
            this.y + this.height < mo.hitbox.y + mo.hitbox.height;
    }

    /**
     * decreases energy of object and sets time of last hit
     */
    hit() {
        this.energy -= 3;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * checks if caller has been hit in the last 700ms
     * @returns {boolean} - true, if object has been hit in the last 700ms
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 700;
    }

    /**
     * checks if object is dead(energy == 0)
     * @returns {boolean} - true, if object is dead
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * sets image of object to the naxt image in the array
     * @param {Array} images - array of images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * moves object to right (increases x position)
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * moves object to left (decreases x position)
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * makes object jump by setting y speed
     */
    jump() {
        this.speedY = 30;
    }
}