class Character extends MovableObject {
    y = 10;
    height = 320;
    width = 120;
    speed = 5; 
    frameX = 13 ;
    frameY = 123;
    frameWidth = -25;
    frameHeight = -135;
    interval;
    lastinteraction = 0;
    world; 
    walking_sound = new Audio('./audio/running.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [ /// (Jump) 
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [ /// (Collition)
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
        'img/2_character_pepe/5_dead/D-57.png',
        'img/2_character_pepe/5_dead/D-57.png',
        'img/2_character_pepe/5_dead/D-57.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImage(' ');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.animate();
        this.applyGravity(); /// (Gravity)
        this.loadImages(this.IMAGES_JUMPING); /// (Jump) loads all jump graphics
    };

    
  
    /**
     * Diese Function animiert die Bewegung von unserem Hauptcharakter
     */
    animate(){
        setInterval(() => {
            // this.world_sound.volume = 0.5;
            if (this.world.keyboard.RIGHT  && this.x < this.world.level.level_end_x){ // or (this.x < 2500)  //(move) if is pressed to the right then it moves by speed=+10px
                this.moveRigt(); 
                this.walking_sound.play(); // (sound) the sound is played when running
                this.otherDirection = false; // (mirror) if "" then the vari otherDirection = false
                this.lastinteraction = new Date().getTime();
            }

            if (this.world.keyboard.LEFT && this.x > 0) { // (move) if is pressed to the left then it moves by speed=-10px
                this.moveLeft();
                this.otherDirection = true; // (mirror) if "" then the vari otherDirection = true
                this.walking_sound.play(); // (sound) the sound is played when running
                this.lastinteraction = new Date().getTime();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) { /// (Jumping) If this.world.keyboard.UP is pressed and it is not above the ground then increase SpeedY
                this.jump(); //(Jumping)
                this.jumping_sound.play(); // the sound is played when you jump
                this.jumping_sound.volume = 0.1; //
                this.lastinteraction = new Date().getTime();
            }
            
            this.world.camera_x = -this.x + 100; // (Cam) // -this.x + 100; => coordinates where the character can be seen
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.isDead()) { /// (Collition hit) if the energy of the character is 0 than play the dead animation
                this.playAnimation(this.IMAGES_DEAD);
                this.walking_sound.pause();
                world.world_sound.muted = true;
                this.speed = 0
                setTimeout(() => {
                    for (let i = 1; i < 9999; i++) window.clearInterval(i);
                }, 2000);
                document.getElementById('youlostScreen').classList.remove('displayNone');
                document.getElementById('playAgain').classList.remove('displayNone');
            } 
            else if (this.isHurt()) { /// (Collition hit) play animation if character is hit
                this.playAnimation(this.IMAGES_HURT)
            }
            else if (this.isAboveGround()) { /// (Jump) If the character is in the air y < 110 then perform animation
                this.playAnimation(this.IMAGES_JUMPING)
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { //(key) to show the animation at right and left
                this.playAnimation(this.IMAGES_WALKING)
            } else if (new Date().getTime() - this.lastinteraction > 6000){
                this.playAnimation(this.IMAGES_SLEEP)
            } else {
                this.playAnimation(this.IMAGES_IDLE)
            }
        }, 200 )

        /**
         * If any of the keyboard keys is pressed a sleep animation will start
         */
        setInterval(() => {
                if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                    this.walking_sound.pause(); // (sound) when stopped, the sound is stopped
                }           
        }, 200);
    };
}