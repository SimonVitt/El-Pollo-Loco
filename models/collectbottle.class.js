/**
 * collactable bottle class
 */
class CollectBottle extends CollectableObject{
    
    height = 80;
    width = 60;
    y = 350;
    hitbox = new Hitbox(this.x + 20, this.y + 16, this.height - 24, this.width -34);

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * creates collectable bottle
     */
    constructor(){
        super();
        this.showDifferentImages();
    }

    /**
     * shows randomly one of two pictures of a bottle
     */
    showDifferentImages(){
        let number = Math.random();
        if(number < 0.5){
            this.loadImage(this.IMAGES[0]);
        }else{
            this.loadImage(this.IMAGES[1]);
        }
    }
}