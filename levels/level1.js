/**
 * initializes the first level, whith creating all objects, which are different in every level, and giving important varaiables
 * @returns {object} level1 - just initialized level 1
 */
function initLevel1(){
    let level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new Cloud(0),
            new Cloud(1),
            new Cloud(2),
            new Cloud(3),
            new Cloud(4),
            new Cloud(5)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 1439),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 1439),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 1439),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 1439),
            new BackgroundObject('img/5_background/layers/air.png', 2878),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 2878),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 2878),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 2878)
        ],
        [
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new CollectBottle(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        9, //amount Coins
        10  //amountCollectBottles
    );
    return level1;
}
