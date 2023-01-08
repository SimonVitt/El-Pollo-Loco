/**
 * cloud class
 */
class Cloud extends MovableObject{

    y = 0;
    width = 720;
    height = 480;
    speed = 0.15;
    cloudsAnimationInterval;

    /**
     * loads image of cloud
     * sets x position
     * @param {number} x - x position of cloud 
     */
    constructor(x){
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = x * 720;

        this.animate();
    }

    /**
     * animates movement to the left
     */
    animate(){
        this.cloudsAnimationInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}