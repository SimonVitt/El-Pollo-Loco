/**
 * statusbar for characters healt (energy) class
 */
class HealthStatusBar extends StatusBar{
    
    y = 0;

    /**
     * different images of the healthstatusbar, depending on how much the bar should be filled
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.webp',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.webp',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.webp',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.webp',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.webp',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.webp'
    ];

    /**
     * constuctor loads all images and sets percentage of bar(how much its filled), which is 100 at first, because no demage has been done on him yet
     */
    constructor(){
        super().loadImages(this.IMAGES);
        this.setPercentage(100, this.IMAGES);
    }
}