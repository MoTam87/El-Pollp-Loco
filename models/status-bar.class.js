class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    };

    /**
     * Set the percentage value and update the corresponding image.
     * 
     * This method sets the percentage value for a status bar and updates the corresponding image based on the resolved image index.
     * 
     * @param {number} percentage - The new percentage value to be set
     */
    setPercentage(percentage) {
        this.percentage = percentage; // Set the new percentage value
        let path = this.IMAGES[this.resolveImageIndex()]; // Get the image path based on the resolved image index
        this.img = this.imageCache[path]; // Update the image using the image cache
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
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        }else if (this.percentage > 20) {
            return 1;
        }else {
           return 0;
        }
    };
}