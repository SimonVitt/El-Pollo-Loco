/**
 * statusbar amount of collected coins class
 */
class CoinsStatusBar extends StatusBar{
    y = 50;

    /**
     * different images of the coinstatusbar, depending on how much the bar should be filled
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.webp',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.webp',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.webp',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.webp',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.webp',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.webp'
    ];

    /**
     * constuctor loads all images and sets percentage of bar(how much its filled), which is 0 at first, because no coins have been collected yet
     */
    constructor(){
        super().loadImages(this.IMAGES);
        this.setPercentage(0, this.IMAGES);
    }
}