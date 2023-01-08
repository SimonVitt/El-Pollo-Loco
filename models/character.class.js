/**
 * character played by the user class
 */
class Character extends MovableObject {

    height = 280;
    y = 150;
    x = 200;
    world;
    speed = 10;
    timeUserInactive;
    characterNavigateInterval;
    characterChangeAnimationsInterval;
    hitbox = new Hitbox(this.x + 30, this.y + 140, this.height - 160, this.width - 60);

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    walking_sound = new Audio('audio/footsteps.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');

    /**
     * constructor to creare character
     * loads all images in imagecache of character
     * calls functions to initialize character
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.setUserActive();
        this.applyGravity();
        this.animate();
        allAudios.push(this.walking_sound);
        allAudios.push(this.jumping_sound);
        allAudios.push(this.hurt_sound);
        this.setMuted();
    }

    /**
     * sets all sounds made by character muted or unmuted
     */
    setMuted(){
        if(muted){
            this.walking_sound.muted = true;
            this.jumping_sound.muted = true;
            this.hurt_sound.muted = true;
        }
    }

    /**
     * calls functions to animate character (movements and images)
     */
    animate() {
        this.navigate();
        this.changeAnimations();
    }

    /**
     * checks input of user and calls functions for it's movement, depending on every input
     */
    navigate() {
        this.characterNavigateInterval = setInterval(() => {
            this.walking_sound.playbackRate = 2;
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }
            this.hitbox.updateHitbox(this.x + 30, this.y + 140);
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * checks status of character and calls functions for it's animated pictures, depending on every input
     */
    changeAnimations() {
        this.characterChangeAnimationsInterval = setInterval(() => {
            if (this.isDead()) {
                this.walking_sound.pause();
                this.playAnimation(this.IMAGES_DEAD);
                this.setUserActive();
                clearInterval(this.characterNavigateInterval);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
                this.setUserActive();
                this.hurt_sound.play();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.setUserActive();
            } else if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.setUserActive();
            } else {
                this.animateUserInactive();
            }
        }, 100);
    }

    /**
     * checks if user is inactive and if user is, plays sleeping images
     */
    animateUserInactive() {
        let currentTime = new Date().getTime();
        if (currentTime - this.timeUserInactive > 8000) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * sets time of the last input the user made
     */
    setUserActive() {
        this.timeUserInactive = new Date().getTime();
    }
}