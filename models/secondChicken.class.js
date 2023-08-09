class BigChicken extends MovableObject {
    y = 330;
    height = 100;
    width = 80;
    frameX = 0;
    frameY = 0;
    frameWidth = 0;
    frameHeight = 0;
    
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',  // all images belonging to the chicken to show the animation 
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png') // load the image of the chicken
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 500 + Math.random() * 4000;
        this.speed = 0.15 + Math.random() * 0.5;
    };

    /**
     * Animate the object's movement and animations.
     * 
     * This method uses two separate intervals to control the object's movement and animations.
     * It repeatedly calls the `moveLeft` method every frame and plays walking and dead animations as appropriate.
     */
    animate(){
        setInterval (() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
            };
        }, 200)
    };
}