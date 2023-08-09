class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard; // (key)
    camera_x = 0; // (Cam)
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectableObjectcoins = [];
    collectableObjectBottles = [];
    world_sound = new Audio('./audio/music.mp3') // (sound)
    collectedCoins = 0;
    collectedBottles = 0;
    enemyDeadArray = []; /// here are the dead enemies
    collectedBottlesArray = [];
    timer = 60; // 1 minute in seconds
    distanceTraveled = 0;
    maxDistance = 500;

    constructor(canvas, keyboard,) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard; // (key)
        this.draw();
        this.setWorld();
        this.check();
        this.startTimer();
    };

    /**
     * Start a countdown timer.
     * 
     * This method starts a countdown timer that decrements the timer value.
     * When the timer reaches 0, it mutes the world sound, displays a "you lost" screen,
     * and shows a "play again" button.
     *
     */
    startTimer() {
        const interval = setInterval(() => {
          this.timer--;
          if (this.timer <= 0) {
            this.world_sound.muted = true;
            document.getElementById('youlostScreen').classList.remove('displayNone');
            document.getElementById('playAgain').classList.remove('displayNone');
            for (let i = 1; i < 9999; i++) window.clearInterval(i);
          }
        }, 1000); // Update the timer every 1000 milliseconds (1 second)
    };

    /**
     Format the timer value into a formatted string.
     * 
     * This function takes a timer value in seconds and converts it into a formatted string in the format "MM:SS".
     * 
     * @param {number} timer - The timer value in seconds.
     * @returns {string} The formatted timer string.
     */
    formatTimer(timer) {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    /**
     * Draw the timer on the canvas.
     * 
     * This function uses the formatted timer string to draw the timer on the canvas.
     * 
     */
    drawTimer() {
        const timerText = this.formatTimer(this.timer);
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center'; // Zentriert den Text horizontal
        this.ctx.fillText(timerText, this.canvas.width / 2, 40); // Positioniert den Text oben im Canvas
    };

    /**
     * Set up the world and character properties.
     * 
     * This function sets up the world properties and initializes the character's association with the world.
     * It also configures the background sound with the desired settings.
     *
     */
    setWorld(){
        this.character.world = this; // (key)
        const numberOfTimes = 5; // Set the desired number of repetitions
        this.world_sound.play();
        this.world_sound.loop = true;
        this.world_sound.volume = 0.5;  
    };

    /**
     * This function checks if our character is colliding with any of the enemies and 
       reduce the amount of the energy and if the key D is pressed a bottle will be thrown
     * 
     */
    check() {
        setInterval(() => {
            this.checkCollitions();
            this.checkThrowableObjects();
            this.checkCollectingCoins();
            this.checkCollectingBottles();
            this.checkJumpCollitions();
            this.checkBottleCollisions();
            this.checkEndbossCollisions()
        }, 200);

        setInterval(() => {
            this.checkJumpCollitions();
        }, 50);
    }

    /**
     * Check for collisions between the character and enemies.
     * 
     * This function iterates through the enemies in the level, checks for collisions between the character
     * and each enemy, and updates the character's energy and status bar accordingly.
     * 
     */
    checkCollitions() {
        this.level.enemies.forEach( (enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.enemyDeadArray.includes(enemy)) {
                this.character.hit(); /// (Collision hit)
                this.statusBar.setPercentage(this.character.energy)  ///(Statusbar)
            }
        })
    }

    /**
     * Check for throwable objects and handle throwing action.
     * 
     * This function checks if the "D" key is pressed and the character has collected bottles.
     * If conditions are met, it creates a new throwable object (bottle) and adds it to the list of throwable objects.
     * 
     */
    checkThrowableObjects() {
        if (this.keyboard.D && this.collectedBottles > 0 ) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);    
        }
    };

    /**
     * Check for collecting coins by the character.
     * 
     * This function iterates through the collectable coins in the level.
     * If the character collides with a coin, it removes the coin from the list of collectable coins,
     * increases the collected coins count, and updates the corresponding status bar.
     * 
     */
    checkCollectingCoins() {
         this.level.collectableObjectcoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.collectableObjectcoins.splice(index, 1);
                this.collectedCoins++;
                this.statusBarCoins.setPercentage(this.collectedCoins);  ///(Statusbar coins)
            }
        });
    }

    /**
     * this function iterates through an array of bottles and removes them from the array if the character collides with them and count the collected ones
     * 
     */
    checkCollectingBottles() {
        this.level.collectableObjectBottles.forEach ((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.collectableObjectBottles.splice(index, 1);
                this.collectedBottles++;
                this.collectedBottlesArray.push(bottle);
                this.statusBarBottles.setPercentage(this.collectedBottles);  ///(Statusbar bottles)
            };
        });
    };

    /**
     * Check for collisions during character jump and handle enemy interactions.
     * 
     * This function iterates through the enemies in the level.
     * If the character collides with an enemy, is above the ground, and the enemy still has energy,
     * it reduces the enemy's energy to 0, stops its movement animation, adds it to the list of dead enemies,
     * and eventually removes it from the canvas after a delay.
     * 
     */
    checkJumpCollitions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy.energy > 0)  {
                enemy.energy = 0;
                enemy.speed = 0; /// stop move left animation when enemy is dead
                this.enemyDeadArray.push(enemy) /// push the dead enemies into enemyDeadArray
                setTimeout(() => {
                    this.level.enemies.splice(index, 1); /// remove the dead enemy from canvas
                }, 200);
            };
        });
    };

    /**
     * Check for collisions between throwable objects (bottles) and enemies.
     * 
     * This function iterates through the throwable objects and checks if they collide with enemies.
     * If a throwable object hits an enemy (either BigChicken or Chicken), it updates the status bar for collected bottles,
     * sets the hit status for the bottle, kills the enemy, and removes it from the canvas after a delay.
     * 
     */
    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.statusBarBottles.setPercentage(this.collectedBottles - this.throwableObjects.length)
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(bottle) && enemy instanceof BigChicken || enemy.isColliding(bottle) && enemy instanceof Chicken ) {
                    bottle.hasHitEnemy = true; 
                    enemy.energy = 0;
                    enemy.speed = 0; /// stop move left animation when enemy is dead
                    this.enemyDeadArray.push(enemy) /// push the dead enemies into enemyDeadArray
                    setTimeout(() => {
                    this.level.enemies.splice(index, 1); /// remove the dead enemy from canvas
                }, 1000);
                }
            });
        });
    };

    /**
     * Check for collisions between throwable objects (bottles) and the Endboss enemy.
     * 
     * This function iterates through the throwable objects and checks if they collide with the Endboss enemy.
     * If a throwable object hits the Endboss, it sets the hit status for the bottle,
     * reduces the Endboss's energy, updates the status bar for the Endboss, and triggers the Endboss's walking animation
     * for a set distance.
     * 
     */
    checkEndbossCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle) && enemy instanceof Endboss) {
                    bottle.hasHitEnemy = true; 
                    enemy.hitBoss();
                    this.statusBarEndboss.setPercentage(enemy.energy)
                    // Endboss can only walk for a set distance
                    const interval = setInterval(() => {
                      if (this.distanceTraveled < this.maxDistance) {
                        enemy.x -= 10;
                        this.distanceTraveled += 10;
                        enemy.playAnimation(enemy.IMAGES_WALKING)
                      } else {
                        clearInterval(interval); // Stop the interval when the maximum distance is reached
                      }
                    }, 100);
                }
            });
        });
    };
        
    /**
     * Draw the game elements on the canvas.
     * 
     * This method clears the canvas, translates the camera if necessary, and draws various game elements.
     * It draws the timer, status bars (energy, coins, bottles, Endboss), the character, collectable objects, enemies, and throwable objects.
     * The method is recursively called using requestAnimationFrame for continuous drawing.
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); // Translate for camera movement (if applicable)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // Translate back (for status bars)
        this.drawTimer();
        this.addToMap(this.statusBar); // Draw energy status bar
        this.addToMap(this.statusBarCoins); // Draw coins status bar
        this.addToMap(this.statusBarBottles); // Draw bottles status bar
        this.addToMap(this.statusBarEndboss); // Draw Endboss energy status bar
        this.ctx.translate(this.camera_x, 0); // Translate for camera movement (if applicable)
        this.addToMap(this.character); // Draw character
        this.addObjectsToMap(this.level.collectableObjectBottles); // Draw collectable bottles
        this.addObjectsToMap(this.level.enemies); // Draw enemies
        this.addObjectsToMap(this.throwableObjects); // Draw throwable objects (bottles)
        this.addObjectsToMap(this.level.collectableObjectcoins); // Draw collectable coins
        this.ctx.translate(-this.camera_x, 0); // Translate back (for camera movement)
        // Continuously redraw using requestAnimationFrame
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    };

    /**
     * Draw all objects in the game that are stored in an array.
     * 
     * This function iterates through an array of objects and adds each object to the map for drawing.
     * 
     * @param {Array} objects - An array of game objects to be drawn.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        })
    }
    
    /**
     * Add an object to the drawing map with optional mirroring.
     * 
     * This function adds a given object to the drawing map.
     * It also checks if the object should be mirrored, and applies mirroring transformations if necessary.
     * Additionally, it draws the collision frame around objects.
     * 
     * @param {Object} mo - The game object to be added to the drawing map.
     */
    addToMap(mo) {
        if (mo.otherDirection) { // Check if the object should be mirrored
            this.flipImage(mo); // Apply mirroring transformation
        }
        mo.draw(this.ctx); // Draw the object
        mo.drawFrame(this.ctx); // Draw the collision frame around the object
        if (mo.otherDirection) { // Reset the object to its original position if mirrored
            this.flipBack(mo);
        }
    };

    /**
     * Flip an image horizontally and adjust its position.
     * 
     * This function saves the current context state, applies a horizontal scaling to flip the image,
     * and adjusts the object's position accordingly.
     * 
     * @param {Object} mo - The game object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save(); // Save the current context state
        this.ctx.translate(mo.width, 0); // Translate to the right edge of the object
        this.ctx.scale(-1, 1); // Apply horizontal scaling to flip the image
        mo.x = mo.x * -1; // Adjust the object's x position for flipping
    };

    /**
     * Restore the original context state after flipping.
     * 
     * This function restores the original context state after flipping an image.
     * It adjusts the object's position back to its original value.
     * 
     * @param {Object} mo - The game object whose image was flipped.
     */
    flipBack(mo) {
        mo.x = mo.x * -1; // Adjust the object's x position back to its original value
        this.ctx.restore(); // Restore the saved context state
    };

}