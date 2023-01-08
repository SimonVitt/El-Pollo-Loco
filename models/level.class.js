/**
 * level class
 */
class Level{
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    collectableObjects = [];
    amountCoins;
    amountCollectBottles;
    level_end_x = 3650;

    /**
     * creates a level
     * @param {Array} enemies - array with all enemies
     * @param {Array} clouds - array with all clouds
     * @param {Array} backgroundObjects - array with all backgroundobjects
     * @param {Array} collectableObjects - array with all collectableobjects
     * @param {number} amountCoins - amount of coins
     * @param {number} amountCollectBottles - amount of bottles
     */
    constructor(enemies, clouds, backgroundObjects, collectableObjects, amountCoins, amountCollectBottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.amountCoins = amountCoins;
        this.amountCollectBottles = amountCollectBottles;
    }
}