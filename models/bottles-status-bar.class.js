/**
 * statusbar amount of collected bottles class
 */
class BottleStatusBar extends StatusBar{
    y = 100;

    /**
     * different images of the bottlestatusbar, depending on how much the bar should be filled
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.webp',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.webp',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.webp',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.webp',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.webp',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.webp'
    ]

    /**
     * constuctor loads all images and sets percentage of bar(how much its filled), which is 0 at first, because no bottles have been collected yet
     */
    constructor(){
        super().loadImages(this.IMAGES);
        this.setPercentage(0, this.IMAGES);
    }
}