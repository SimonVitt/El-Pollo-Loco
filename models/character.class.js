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
        'img/2_character_pepe/1_idle/idle/I-1.webp',
        'img/2_character_pepe/1_idle/idle/I-2.webp',
        'img/2_character_pepe/1_idle/idle/I-3.webp',
        'img/2_character_pepe/1_idle/idle/I-4.webp',
        'img/2_character_pepe/1_idle/idle/I-5.webp',
        'img/2_character_pepe/1_idle/idle/I-6.webp',
        'img/2_character_pepe/1_idle/idle/I-7.webp',
        'img/2_character_pepe/1_idle/idle/I-8.webp',
        'img/2_character_pepe/1_idle/idle/I-9.webp',
        'img/2_character_pepe/1_idle/idle/I-10.webp'
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.webp',
        'img/2_character_pepe/1_idle/long_idle/I-12.webp',
        'img/2_character_pepe/1_idle/long_idle/I-13.webp',
        'img/2_character_pepe/1_idle/long_idle/I-14.webp',
        'img/2_character_pepe/1_idle/long_idle/I-15.webp',
        'img/2_character_pepe/1_idle/long_idle/I-16.webp',
        'img/2_character_pepe/1_idle/long_idle/I-17.webp',
        'img/2_character_pepe/1_idle/long_idle/I-18.webp',
        'img/2_character_pepe/1_idle/long_idle/I-19.webp',
        'img/2_character_pepe/1_idle/long_idle/I-20.webp'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.webp',
        'img/2_character_pepe/2_walk/W-22.webp',
        'img/2_character_pepe/2_walk/W-23.webp',
        'img/2_character_pepe/2_walk/W-24.webp',
        'img/2_character_pepe/2_walk/W-25.webp',
        'img/2_character_pepe/2_walk/W-26.webp'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.webp',
        'img/2_character_pepe/3_jump/J-32.webp',
        'img/2_character_pepe/3_jump/J-33.webp',
        'img/2_character_pepe/3_jump/J-34.webp',
        'img/2_character_pepe/3_jump/J-35.webp',
        'img/2_character_pepe/3_jump/J-36.webp',
        'img/2_character_pepe/3_jump/J-37.webp',
        'img/2_character_pepe/3_jump/J-38.webp',
        'img/2_character_pepe/3_jump/J-39.webp',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.webp',
        'img/2_character_pepe/4_hurt/H-42.webp',
        'img/2_character_pepe/4_hurt/H-43.webp'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.webp',
        'img/2_character_pepe/5_dead/D-52.webp',
        'img/2_character_pepe/5_dead/D-53.webp',
        'img/2_character_pepe/5_dead/D-54.webp',
        'img/2_character_pepe/5_dead/D-55.webp',
        'img/2_character_pepe/5_dead/D-56.webp',
        'img/2_character_pepe/5_dead/D-57.webp'
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
        super().loadImage('img/2_character_pepe/2_walk/W-21.webp');
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