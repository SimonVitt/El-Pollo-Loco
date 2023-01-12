/**
 * coin class
 */
class Coin extends CollectableObject{

    width = 150;
    height = 150;
    hitbox;

    IMAGES = [
        'img/8_coin/coin_1.webp'
    ];

    /**
     * constructor creates coin
     * loads it's images
     * sets it's y position randomly
     * sets hitbox
     */
    constructor(){
        super().loadImage(this.IMAGES[0]);
        this.y = Math.floor(Math.random() * (300 - 100 + 1) + 100);
        this.hitbox = new Hitbox(this.x + 55, this.y + 55, this.height - 110, this.width -110);
    }
}