class StatusBarEndboss extends DrawableObject {
    percentage = 100;

    IMAGES = [
        'img/7_statusbars/1_statusbar/statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/1_statusbar/statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/1_statusbar/statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/1_statusbar/statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/1_statusbar/statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/1_statusbar/statusbar_endboss/orange/orange100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    };

    /**
     * Set the percentage value and update the corresponding image.
     * 
     * This method sets the percentage value for a status bar and updates the corresponding image based on the resolved image index.
     * 
     * @method setPercentage
     * @param {number} percentage - The new percentage value to be set.
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
        }else if (this.percentage > 10) {
            return 1;
        }else {
           return 0;
        }
    };
}