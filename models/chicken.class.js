class Chicken extends MovableObject {
    y = 370;
    height = 70;
    width = 60;
    frameX = 0;
    frameY = 0;
    frameWidth = 5;
    frameHeight = 0;
    
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 4000;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.5;
    };

    /**
     * Animate the object's movement and actions.
     * 
     * This method uses two separate intervals to control the object's movement and animations.
     * It repeatedly calls the `moveLeft` method every frame and plays walking and dead animations as appropriate.
     * 
    */
    animate(){
        setInterval (() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING); // Play walking animation
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD); // Play dead animation if the object is dead
            }       
        }, 200)
    };
}