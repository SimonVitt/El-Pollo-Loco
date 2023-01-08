/**
 * statusbar class
 */
class StatusBar extends DrawableObject{
    x = 20;
    width = 200;
    height = 60;
    percentage;

    /**
     * sets percentage of statusbar and sets image sdepending on that
     * @param {number} percentage - percentage of statusbar
     * @param {Array} images - images of statusbar
     */
    setPercentage(percentage, images){
        this.percentage = percentage;
        let path = images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * checks with perentage which image of bar should be shown
     * @returns {number} - number of suiting image in array
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage >= 80){
            return 4;
        }else if(this.percentage >= 60){
            return 3;
        }else if(this.percentage >= 40){
            return 2;
        }else if(this.percentage > 0){
            return 1;
        }else {
            return 0;
        }
    }
}