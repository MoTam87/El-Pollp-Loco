class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png')
        this.x = 50 + Math.random() * 4000;
        this.animate();
    };

    /**
     * This function animate the movement of the clouds(0.15px every 0.06s)
     */
    animate() {
        setInterval (() => {
            this.x -= this.speed;
        }, 1000 / 60);
    };
}