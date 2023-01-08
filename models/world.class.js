/**
 * world class
 */
class World {
    character = new Character();
    level = initLevel1();
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBars = [
        new HealthStatusBar(),
        new CoinsStatusBar(),
        new BottleStatusBar()
    ];
    throwableObjects = [];
    coinsCollected = 0;
    bottlesThrown = 0;
    gameover = false;
    bottleThrowInterval;
    checkCollisionsInterval;

    collect_sound = new Audio('audio/collect.mp3');
    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * creates world and calls functions to chack and draw
     * @param {Canvas} canvas - canvas the world should be drawn in
     * @param {Object} keyboard - keyboard of the user for user input
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        allAudios.push(this.collect_sound);
        allAudios.push(this.chicken_sound);
        this.setMuted();
    }

    /**
     * mutes and unmutes sounds created in worldobject
     */
    setMuted(){
        if(muted){
            this.collect_sound.muted = true;
            this.chicken_sound.muted = true;
        }
    }

    /**
     * sets world in character
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * runs functions to check collisions and userinput
     */
    run() {
        this.checkCollisions();
        this.checkThrowObjects();
    }

    /**
     * checks if user wants to throw objects and if there are any left to throw,
     * calls function to throw and updates variables
     */
    checkThrowObjects() {
        this.bottleThrowInterval = setInterval(() => {
            if (this.keyboard.D && this.throwableObjects.length > this.bottlesThrown) {
                this.throwableObjects[this.bottlesThrown].throw(this.character.x + 40, this.character.y + 100, this.character.otherDirection);
                let percentage = ((this.throwableObjects.length - this.bottlesThrown - 1)/ this.level.amountCollectBottles) * 100;
                this.statusBars[2].setPercentage(percentage, this.statusBars[2].IMAGES);
                this.character.setUserActive();
                this.bottlesThrown++;
            }
        }, 100);
    }

    /**
     * checks collisions
     */
    checkCollisions() {
        this.checkCollisionsInterval = setInterval(() => {
            this.checkCollisionsEnemy();
            this.checkCollisionsCollect();
        }, 1000 / 60);
    }

    /**
     * checks collisions of enemies (character from top, character other and bottle)
     */
    checkCollisionsEnemy(){
        this.level.enemies.forEach(enemy => {
            if(this.character.speedY < 0){
                if (this.character.checkCollisionTop(enemy) && !(enemy instanceof Endboss)) {
                    enemy.alive = false;
                    enemy.hitbox.enableHitbox();
                    this.chicken_sound.play();
                } 
            }else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBars[0].setPercentage(this.character.energy, this.statusBars[0].IMAGES);
            }
            this.checkCollisionsBottle(enemy);
        });
    }

    /**
     * checks if character is colliding with an collectable object
     */
    checkCollisionsCollect(){
        this.level.collectableObjects.forEach(co => {
            if (this.character.isColliding(co)) {
                this.collectObjects(co);
                this.collect_sound.playbackRate = 8;
                this.collect_sound.play();
            }
        });
    }

    /**
     * checks if bottle collides with enemy,
     * if so sets enemy dead or reduce it's energy and calls functions
     * @param {Object} enemy - enemy of array enemies
     */
    checkCollisionsBottle(enemy) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy)) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    enemy.alive = false;
                    enemy.hitbox.enableHitbox();
                    bottle.bottleHits();
                    this.chicken_sound.play();
                }
                else if (enemy instanceof Endboss) {
                    bottle.bottleHits();
                    enemy.hitEndboss();
                }
            }
        });
    }

    /**
     * gets called when character collides with any collactableobjects,
     * updates statusbars, updates variables
     * @param {Object} co - any collectableobject 
     */
    collectObjects(co) {
        if (co instanceof Coin) {
            this.coinsCollected++;
            let percentage = (this.coinsCollected / this.level.amountCoins) * 100;
            this.statusBars[1].setPercentage(percentage, this.statusBars[1].IMAGES);
            this.removeCollectedObjects(co);
        }
        if (co instanceof CollectBottle) {
            this.throwableObjects.push(new ThrowableObject());
            let percentage = ((this.throwableObjects.length - this.bottlesThrown) / this.level.amountCollectBottles) * 100;
            this.statusBars[2].setPercentage(percentage, this.statusBars[2].IMAGES);
            this.removeCollectedObjects(co);
        }
    }

    /**
     * removes collectableobject from world, when collected
     * @param {Object} co - any collectableobject 
     */
    removeCollectedObjects(co) {
        let indexCollidedObject = this.level.collectableObjects.indexOf(co);
        this.level.collectableObjects.splice(indexCollidedObject, 1);
    }

    /**
     * calls functions to draw all objects into the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); //canvas cleared

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        //-------space for fixed objects---------
        this.addObjectsToMap(this.statusBars);
        //----------------
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        //draw wird immer wieder aufgerufen, wenn alles gezeichnet
        let self = this;
        this.drawAgain(self);
    }

    /**
     * draws world again, when it has been drawn
     * @param {Object} self - this.world
     */
    drawAgain(self){
        if(!this.gameover){
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    /**
     * calls function to draw object for each object in array
     * @param {Array} objects -  array of objects, which should be drawn 
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * draws object into canvas, depending on in which direction the object is looking
     * @param {Object} mo - any drawable object 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * edits context and object to flip it's image
     * @param {Object} mo - any drawable object 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * reset context to before function 'flipImage()'
     * @param {Object} mo - any drawable object 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}