/**
 * throwableobject (bottle) class
 */
class ThrowableObject extends MovableObject {

    speedY = 25;
    height = 80;
    width = 60;
    spinningAnimationInterval;
    flyingBottleRightInterval;
    flyingBottleLeftInterval;
    hitbox = new Hitbox(this.x + 20, this.y + 16, this.height - 24, this.width - 40);

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.webp',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.webp',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.webp',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.webp'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.webp',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.webp',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.webp',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.webp',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.webp',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.webp'
    ];

    breaking_sound = new Audio('audio/glass.mp3');

    /**
     * creates object
     * loads images in image cache
     */
    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.webp');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        allAudios.push(this.breaking_sound);
        this.setMuted();
    }

    /**
     * mutes and unmutes sound of object
     */
    setMuted(){
        if(muted){
            this.breaking_sound.muted = true;
        }
    }

    /**
     * gets called when user wants to throw bottle
     * @param {number} x - x position where the bottle should be created, depending on the x position of character
     * @param {number} y - y position where the bottle should be created, depending on the y position of character
     * @param {boolean} otherDirection - true, if character is looking to left
     */
    throw(x, y, otherDirection) {
        this.x = x;
        this.y = y;
        this.applyGravity();
        if (!otherDirection) {
            this.setflyingBottleRightInterval();
        } else {
            this.setflyingBottleLeftInterval();
        }
        this.animate();
    }

    /**
     * animates the spinning animation
     */
    animate() {
        this.spinningAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 100);
    }

    /**
     * animates the movement of the bottle and it's hitbox, when thrown to the right
     */
    setflyingBottleRightInterval() {
        this.flyingBottleRightInterval = setInterval(() => {
            this.x += 12;
            this.hitbox.updateHitbox(this.x + 20, this.y + 16);
            if (this.y > 374) {
                this.bottleHits();
            }
        }, 25);
    }

    /**
     * animates the movement of the bottle and it's hitbox, when thrown to the left
     */
    setflyingBottleLeftInterval() {
        this.flyingBottleLeftInterval = setInterval(() => {
            this.x -= 12;
            this.hitbox.updateHitbox(this.x + 20, this.y + 16);
            if (this.y > 374) {
                this.bottleHits();
            }
        }, 25);
    }

    /**
     * gets called when bottle hits enemy or ground
     * animates splashing of the bottle
     */
    bottleHits() {
        this.hitbox.enableHitbox();
        this.stopFlyingBottleIntervals();
        this.currentImage = 0;
        this.breaking_sound.play();
        let bottleSplash = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 70);
        setTimeout(() => {
            clearInterval(bottleSplash);
            this.width = 0;
            this.height = 0;
        }, 350);
    }

    /**
     * stops all intervalls from flying bottle
     */
    stopFlyingBottleIntervals() {
        clearInterval(this.flyingBottleRightInterval);
        clearInterval(this.flyingBottleLeftInterval);
        clearInterval(this.gravityInterval);
        clearInterval(this.spinningAnimationInterval);
    }

}