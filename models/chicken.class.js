/**
 * enemy chicken class
 */
class Chicken extends MovableObject{
    y = 360;
    height = 60;
    width = 80;
    alive = true;
    hitbox = new Hitbox(this.x + 5, this.y + 10, this.height -20, this.width -10);
    chickenAnimateInterval;
    chickenMoveInterval;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.webp',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.webp'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.webp'
    ];

    /**
     * constructor to create an instance
     * sets a random x position and speed
     * loads images in imagecache
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = Math.floor(Math.random() * (3600 -600 + 1)) + 600;
        this.speed = 0.5 + Math.random() * 2;

        this.animate();
    }

    /**
     * calls functions to animate chicken (movements and images)
     */
    animate(){
        this.animateImages();
        this.move();
    }

    /**
     * checks if chicken is dead and animates images depending on it
     */
    animateImages(){
        this.chickenAnimateInterval = setInterval(() => {
            if(this.alive){
                    this.playAnimation(this.IMAGES_WALKING);
            }else{
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 80);
    }

    /**
     * checks if chicken is dead and animates movements (also of it's hitbox) depending on it
     */
    move(){
        this.chickenMoveInterval = setInterval(() => {
            if(this.alive){
                    this.hitbox.updateHitbox(this.x + 5, this.y + 10);
                    this.moveLeft();
            }else{
                this.y = 374;
            }
        }, 1000 / 60);
    }


}