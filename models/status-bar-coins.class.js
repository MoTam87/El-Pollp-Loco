class StatusBarCoins extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',

    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setPercentage();
    };

    /**
     * Set the percentage value and update the corresponding image.
     * 
     * This method sets the percentage value for a status bar and updates the corresponding image based on the resolved image index.
     * 
     * @param {number} percentage - The new percentage value to be set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    };

    /**
     * Resolve the image index based on the current percentage value.
     * 
     * This function determines the appropriate image index based on the current percentage value.
     * It checks the percentage range and returns an index that corresponds to the appropriate image.
     * 
     * @returns {number} The resolved image index.
     */
    resolveImageIndex() {
        if (this.percentage > 11) {
            return 5;
        } else if (this.percentage > 8) {
            return 4;
        } else if (this.percentage >= 6) {
            return 3;
        } else if (this.percentage >= 3) {
            return 2;
        }else if (this.percentage >= 1) {
            return 1;
        }else {
           return 0;
        }
    };
}