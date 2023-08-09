class ThrowableObject extends MovableObject {
    static thrownBottles = 0;
    hasHitEnemy = false;

    IMAGES_ROTATE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor (x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 80;
        this.throw();
    };

    /**
     * Perform the throwing action for a ThrowableObject.
     * 
     * This method handles the throwing action for a ThrowableObject.
     * It checks if the maximum number of bottles has been thrown, and if so, resets the object's position.
     * It also plays animations based on whether the bottle has hit an enemy or not.
     * The method adjusts the thrown bottle's properties for movement, gravity, and animation.
     * 
     * @method throw
     */
    throw () {
        if (ThrowableObject.thrownBottles >= world.collectedBottles) { // max. 12 bottles can be thrown 
            this.x = 0; // Reset the object's position if maximum bottles thrown
            return;
        }

        setInterval(() => {
            if (!this.hasHitEnemy) {
                this.playAnimation(this.IMAGES_ROTATE); // Play rotation animation if not hit enemy
            } else {
                this.playAnimation(this.IMAGES_SPLASH); // Play splash animation if hit enemy
            }
        }, 80);

        ThrowableObject.thrownBottles++; // Increment thrown bottles count
        this.speedY = 10; // Set initial vertical speed
        this.applyGravity(); // Apply gravity effect
        setInterval(() => {
            this.x += 10; // Move the bottle horizontally
        }, 20); // Update position every 20 milliseconds
    };
}