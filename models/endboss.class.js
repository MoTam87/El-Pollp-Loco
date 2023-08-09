class Endboss extends MovableObject {
    frameX = 0;
    frameY = 80;
    frameWidth = 0;
    frameHeight = -90;
    height = 450;
    width = 300;
    y = 0;
    speed = 0.9;
    
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png', 
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    
    constructor(){
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4150;
        this.animate();
    };

    /**
     * Animate the character's actions and status.
     * 
     * This method uses two separate intervals to control the character's animations based on its status.
     * It plays alert animations and checks if the character is hurt or dead, playing corresponding animations and triggering game over if needed.
     * 
     */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT)
        }, 150);

        setInterval(() => {
            if (this.isHurt()) { /// (Collition hit) // Check if the character is hurt (hit)
                this.playAnimation(this.IMAGES_HURT);
            }
            if (this.isDead()) { /// (Collition hit) Check if the character is dead
                this.playAnimation(this.IMAGES_DEAD);
                world.world_sound.volume = 0; // Mute the world sound
                setTimeout(() => { /// Stop InterVal after 2 second
                    for (let i = 1; i < 9999; i++) window.clearInterval(i);
                }, 1000);
                // Display game over screen and play again button
                document.getElementById('gameoverScreen').classList.remove('displayNone');
                document.getElementById('playAgain').classList.remove('displayNone');
            };
        }, 500);
    };
}