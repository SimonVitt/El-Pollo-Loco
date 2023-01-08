/**
 * endboss class
 */
class Endboss extends MovableObject {

    y = 150;
    x = 3600;
    height = 300;
    width = 300;
    speed = 1;
    hitbox = new Hitbox(this.x + 25, this.y + 100, this.height - 150, this.width - 70);
    triggered = false;
    attackNow = false;
    untriggeredInterval;
    triggeredInterval;
    updateHitboxInterval;
    moveLeftInterval;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * creates instance of endboss
     * loads images inot it's imagecache
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        allAudios.push(this.chicken_sound);
        this.setMuted();
    }

    /**
     * mutes and unmutes sound of endboss
     */
    setMuted(){
        if(muted){
            this.chicken_sound.muted = true;
        }
    }

    /**
     * sets updatehitbox intervall
     * and calls functions to animate
     */
    animate() {
        this.updateHitboxInterval = setInterval(() => {
            this.hitbox.updateHitbox(this.x + 25, this.y + 100);
        }, 80);
        this.changeAnimations();
        this.changeAnimationsTriggered();
    }

    /**
     * animation when endboss hasnt been hit by a bottle (not moving yet)
     */
    changeAnimations() {
        this.untriggeredInterval = setInterval(() => {
            if (this.isHurtEndboss()) {
                this.playAnimation(this.IMAGES_HURT);
                this.triggered = true;
                this.chicken_sound.play();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 100);
    }

    /**
     * animation when endboss has been hit by a bottle once, starts moving to left and attacking
     * checks different status of endboss plays animations and movements after its status
     */
    changeAnimationsTriggered() {
        this.triggeredInterval = setInterval(() => {
            if (this.triggered) {
                clearInterval(this.untriggeredInterval);
                if(this.isDead()){
                    this.playAnimation(this.IMAGES_DEAD);
                    clearInterval(this.moveLeftInterval);
                } else if(this.isHurtEndboss()){
                    clearInterval(this.moveLeftInterval);
                    this.playAnimation(this.IMAGES_HURT);
                    this.chicken_sound.play();
                }else if(this.attackNow){
                    clearInterval(this.moveLeftInterval);
                    this.playAnimation(this.IMAGES_ATTACK);
                    this.moveLeftEndboss();
                    this.chicken_sound.play();
                } else{
                    clearInterval(this.moveLeftInterval);
                    this.playAnimation(this.IMAGES_WALKING);
                    this.moveLeftEndboss();
                }
            }
        }, 100);
    }

    /**
     * moves endboss to left (changes x position)
     */
    moveLeftEndboss(){
        this.moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 10 / 25);
    }

    /**
     * endboss has been hit
     * reduces his energy (when energy 0, he dies)
     * attacks 5 seconds after the last hit
     */
    hitEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            setTimeout(() => {
                this.attackNow = true;
                this.speed = 2;
                setTimeout(() => {
                    this.attackNow = false;
                    this.speed = 1;
                }, 2400);
            }, 5000);
        }
    }

    /**
     * sets endboss to status hurt
     * @returns {boolean} - is hurt 
     */
    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 700;
    }


}