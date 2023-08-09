class CollectableObjectCoins extends MovableObject {
    frameX = 40;
    frameY = 40;
    frameWidth = -80;
    frameHeight = -80;

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
        
    constructor () {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 300;
        this.y = 300;
        this.height = 120;
        this.width = 120;
        this.x = 300 + Math.random() * 3500;
        this.y = 100 + Math.random() * 200;
        this.loadImages(this.IMAGES_COINS);
        this.animate();
    };

    /**
     * Animate the object's actions.
     * 
     * This method plays an animation for the object by repeatedly calling the `playAnimation` method with the provided image array.
     * 
     */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS); // Play the coin animation
        }, 200)
    };
}  