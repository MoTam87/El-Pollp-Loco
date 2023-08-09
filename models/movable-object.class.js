class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false; // (mirror) eine Variable die im Character je nach Richtung geändert wird
    speedY = 0; /// (Gravity) Geschwindigkeit nach unten
    acceleration = 2; /// (Gravity) die Beschleunigung 
    energy = 100; /// (collition)
    lastHit = 0; /// (collition isHurt)

    /**
      * this function is for checking the colliding (Collision)
      * 
      * @param {Object} mo 
      * @returns 
      */
    isColliding(mo) {
        return this.x + this.frameX + this.width + this.frameWidth > mo.x &&
        this.y + this.frameY + this.height + this.frameHeight > mo.y &&
        this.x + this.frameX < mo.x + mo.width &&
        this.y + this.frameY < mo.y + mo.height;
    };

    /**
     * This function reduce the amount of energy
     */
    hit() { 
        this.energy -= 2;
        if (this.energy < 0) { // if energy is less than 0 energy should not get less than that
            this.energy = 0; 
        }
        else {
            this.lastHit = new Date().getTime(); /// (collition isHurt) saves the time of the hit
        }
    };

    /**
     * This function reduce the amount of energy
     */
    hitBoss() { 
        this.energy -= 10;
        if (this.energy < 0) { // if energy is less than 0 energy should not get less than that
            this.energy = 0; 
        }
        else {
            this.lastHit = new Date().getTime(); /// (collition isHurt) saves the time of the hit
        }
    };

    /**
     * 
     * @returns /// (collition isHurt) evaluation true or false if the hit is 0.5s ago
     */
    isHurt() { 
        let timepassed = new Date().getTime() - this.lastHit; /// time since last hit
        timepassed = timepassed / 1000;
        return timepassed < 0.5 /// true or false => if true the animation in character.js will start
    };

    /**
     * 
     * @returns the value of energy if the character is dead
     */
    isDead() {
        return this.energy == 0;
    };

    /**
     * Play an animation by updating the object's image.
     * 
     * This function plays an animation by updating the object's image from the provided image array.
     * It uses the currentImage property to keep track of the current animation frame.
     * 
     * @param {Array} IMAGES - An array of image paths for the animation frames.
     */
    playAnimation(IMAGES){
        let i = this.currentImage % IMAGES.length;
        let path = IMAGES[i]
        this.img = this.imageCache[path]
        this.currentImage++;
    };

    /**
     * Move the object to the right.
     * 
     * This function moves the object horizontally to the right based on its speed property.
     * 
     */
    moveRigt() {
        this.x += this.speed;
    };    

    /**
     * Move the object to the left.
     * 
     * This function moves the object horizontally to the left based on its speed property.
     * 
     */
    moveLeft(){
        this.x -= this.speed;
    };

    /** /// (Gravity)
     * Apply gravity to the object while it is in the air.
     * 
     * This function simulates gravity by adjusting the object's vertical position over time.
     * It checks if the object is above the ground or has positive vertical speed and performs calculations accordingly.
     * 
     */
    applyGravity() {
        setInterval(() => {                                 /// (Jumping) Wenn this.world.keyboard.UP gedrückt wird dann SpeedY erhöhen
            if (this.isAboveGround() || this.speedY > 0) {  // wenn der Character in der Luft ist als Y < 110  wir die rechnung ausgefüht
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    };

    /**
     * 
     * @returns - We put this value as a condition in the query and 110 is y = floor
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true
        } else {
        return this.y < 110; 
        }
    };

    /**
     * Initiate a jump action for the object.
     * 
     * This method sets the vertical speed of the object to achieve a jump effect.
     * 
     * @method jump
     */
    jump () {
        this.speedY = 23;
    };

}



