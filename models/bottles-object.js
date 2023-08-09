class CollectableObjectBottles extends MovableObject {
    frameX = 15;
    frameY = 15;
    frameWidth = -20;
    frameHeight = -25;
    
    IMAGES_BOTTLES = [
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];

    constructor () {
        super();
        this.loadRandomImage();
        this.x = 300;
        this.y = 340;
        this.height = 90;
        this.width = 80;
        this.x = 300 + Math.random() * 3500;    
    };

    /**
     * Load a random image from the IMAGES_BOTTLES array.
     * 
     * This method generates a random index within the range of the IMAGES_BOTTLES array and loads the corresponding image.
     */
    loadRandomImage() {
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLES.length); // Generate a random index
        const randomImage = this.IMAGES_BOTTLES[randomIndex]; // Get the random image path
        this.loadImage(randomImage); // Load the random image
    };
} 