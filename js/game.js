let canvas;
let world;
let keyboard = new Keyboard (); // (key)
walking_sound = new Audio('./audio/running.mp3'); // (sound)
jumping_sound = new Audio('./audio/jump.mp3'); // (sound)
world_sound = new Audio('./audio/music.mp3'); // (sound)

/**
 * Initialize the game.
 * 
 * This function initializes the game world, hides certain elements, and displays relevant buttons.
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World (canvas, keyboard); //(key)
    document.getElementById('btn').classList.add('displayNone');
    document.getElementById('image').classList.add('displayNone');
    document.getElementById('btn2').classList.add('displayNone');
    document.getElementById('instructions').classList.add('displayNone');
    document.getElementById('soundOnIcon').classList.remove('displayNone');
    document.getElementById('fullScreen').classList.remove('displayNone');
    mobileBtn()    
};

/**
 * Function to show instructions for how to play the game.
 * 
 * This function hides certain elements and displays instructions for how to play the game.
 * 
 */
function howPlay() {
    document.getElementById('instructions').classList.remove('displayNone');
    document.getElementById('image').classList.add('displayNone')
    document.getElementById('canvas').classList.add('displayNone')
    document.getElementById('btn2').classList.add('displayNone')
    document.getElementById('btn').classList.add('displayNone');
    document.getElementById('titel').classList.add('displayNone');
    document.getElementById('btn3').classList.remove('displayNone');
};

/**
 * Function to start the game.
 * 
 * This function initializes the game world, hides instructions and certain elements,
 * and displays the game canvas and relevant buttons.
 * 
 */
function startGame() {
    canvas = document.getElementById('canvas');
    world = new World (canvas, keyboard); //(key)
    document.getElementById('image').classList.add('displayNone');
    document.getElementById('instructions').classList.add('displayNone');
    document.getElementById('titel').classList.remove('displayNone');
    document.getElementById('canvas').classList.remove('displayNone');
    document.getElementById('btn').classList.add('displayNone');
    document.getElementById('btn3').classList.add('displayNone');
    document.getElementById('soundOnIcon').classList.remove('displayNone');
    document.getElementById('fullScreen').classList.remove('displayNone');
    mobileBtn()
};

/**
 * Function to enter fullscreen mode for a specified element.
 * 
 * This function requests fullscreen mode for a specified element using the `enterFullscreen` function.
 * 
 */
function fullScreen() {
    let fullscreen = document.getElementById('canvas')
    enterFullscreen(fullscreen)
};

/**
 * Function to request fullscreen mode for a specified element.
 * 
 * This function attempts to enter fullscreen mode for the given element using various browser-specific APIs.
 * 
 * @param {Element} element - The HTML element to be displayed in fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11 (remove after June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Function to exit fullscreen mode.
 * 
 * This function attempts to exit fullscreen mode using various browser-specific APIs.
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Function to disable sound effects and update the sound icon.
 * 
 */
function soundOff() {
    world.character.walking_sound.muted = true;
    world.character.jumping_sound.muted = true;
    world.world_sound.muted = true;
    let soundContainer = document.getElementById('soundIconContainer');
    soundContainer.innerHTML = '';
    soundContainer.innerHTML = '<img onclick="soundOn()" class="soundOnIcon" id="soundOnIconOn" src="img/5_background/soundOff.png">'
};

/**
 * Function to enable sound effects and update the sound icon.
 * 
 */
function soundOn() {
    world.character.walking_sound.muted = false;
    world.character.jumping_sound.muted = false;
    world.world_sound.muted = false;
    let soundContainer = document.getElementById('soundIconContainer');
    soundContainer.innerHTML = '';
    soundContainer.innerHTML = '<img onclick="soundOff()" class="soundOnIcon" id="soundOnIconOn" src="img/5_background/soundOn.png">';
}

/**
 * (key)Eine Function die beim Drücken auf eine der jeweiligen Taste einen der Events auf true setzt 
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * (key)Eine Function die beim loslassen auf eine der jeweiligen Taste einen der Events auf false setzt
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


/**
 * /**
 * Function to handle mobile button inputs for character actions.
 * 
 * This function assigns touch event listeners to on-screen buttons for character movement and actions.
 * It updates the respective keyboard state based on touch events.
 * 
 */
function mobileBtn() {
    const iconLeft = document.getElementById('left');
    const iconRight = document.getElementById('right');
    const iconJump = document.getElementById('jump');
    const iconThrow = document.getElementById('throw');

    iconLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    iconLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    iconRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    iconRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    iconJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    iconJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    iconThrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    iconThrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
};