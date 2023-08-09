class DrawableObject {
    x = 150;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**
     * this function draws the character on the canvas
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    /**
     * this function draws a frame around the following instance Character, Chicken, BigChicken
     * 
     * @param {*} ctx 
     */
    drawFrame(ctx){ //(Collision)
        if (this instanceof Character || this instanceof Chicken || this instanceof BigChicken || this instanceof CollectableObjectCoins || this instanceof CollectableObjectBottles || this instanceof Endboss) { // den Frame nur die Instanzen
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = "transparent";
            ctx.rect(this.x + this.frameX, this.y + this.frameY, this.width + this.frameWidth, this.height + this.frameHeight); // (Ecke oben links, Ecke unten rechts ) 
            ctx.stroke();
        }
    };

    /**
     * (1) This function load all walk images and push them into the array imageCache
     *  
     * @param {Array} arr - Path of the eath image
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scale(-1)'
            this.imageCache[path] = img
        });
    };
}