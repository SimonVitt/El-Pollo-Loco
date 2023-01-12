let canvas;
let world;
let keyboard = new Keyboard();
let win_sound = new Audio('audio/win.mp3');
let lost_sound = new Audio('audio/lost.mp3');
let start_sound = new Audio('audio/start.mp3');
allAudios.push(win_sound); // sounds getting pushed to all sounds array
allAudios.push(lost_sound);
allAudios.push(start_sound);
let fullscreen = false; //boolean if user wants game to be in fullscreen

/**
 * function gets called onclick start-button in startscreen, calls different functions, so that game starts
 */
function startGame() {
    document.getElementById('startDiv').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
    start_sound.play();
    gameOver();
}

/**
 * function gets called to return to the startscreen from gameover screen
 */
function returnToStart() {
    document.getElementById('startDiv').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endDiv').classList.add('d-none');
}

/**
 * function initializes the game, so it creates a new world
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * function gets called onclick fullscreen-button to make game enter fullscreen or exit fullscreen
 */
function showFullscreen() {
    document.getElementById('buttonFullscreen').blur();
    if (fullscreen) {
        exitFullscreen();
        fullscreen = false;
        document.getElementById('buttonFullscreenImg').src = "img/iconspanel/fullscreen.webp";
    } else {
        enterFullscreen(document.getElementById('game'));
        fullscreen = true;
        document.getElementById('buttonFullscreenImg').src = "img/iconspanel/exitfullscreen.webp";
    }
}

/**
 * shows an element in fullscreem
 * @param {HTMLElement} element - element which should be displayed in fullscreen 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * exit fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * function gets called onclick mute-button and mutes game or turns the gamesound on again
 */
function muteGame() {
    document.getElementById('buttonMute').blur();
    if(muted){
        document.getElementById('buttonMuteImg').src = 'img/iconspanel/mute.webp';
        muted = false;
        allAudios.forEach(audio => {audio.muted = false});
    }else{
        document.getElementById('buttonMuteImg').src = 'img/iconspanel/soundon.webp';
        muted = true;
        allAudios.forEach(audio => {audio.muted = true});
    }
}

/**
 * Interval which constantly checks, if the game is over, when it's over it shows the endscreen
 */
function gameOver() {
    let gameoverInterval = setInterval(() => {
        if (world.character.isDead()) {
            clearInterval(gameoverInterval);
            showEndScreen();
            lost_sound.play();
        } else if (getDeathEndboss()) {
            clearInterval(gameoverInterval);
            showEndScreen();
            win_sound.play();
        }
    }, 100);
}

/**
 * shows endscreen after one second depending on the death of the character or of the endboss, calls functions to stop game
 */
function showEndScreen() {
    setTimeout(() => {
        world.gameover = true;
        document.getElementById('endDiv').classList.remove('d-none');
        cancelAnimationFrame(world.drawAgain);
        stopAllIntervals();
        if (world.character.isDead()) {
            document.getElementById('endDivImg').src = 'img/9_intro_outro_screens/game_over/you-lost.webp';
        } else {
            document.getElementById('endDivImg').src = 'img/9_intro_outro_screens/game_over/game-over.webp';
        }
    }, 400);
}

/**
 * checks if the endboss is dead
 * @returns {boolean} deathendboss - dead endboss
 */
function getDeathEndboss() {
    let endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
    return endboss.isDead();
}

/**
 * stops all intevalls, when game is over
 */
function stopAllIntervals() {
    clearInterval(world.character.characterChangeAnimationsInterval);
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            clearInterval(enemy.chickenAnimateInterval);
            clearInterval(enemy.chickenMoveInterval);
        } else {
            clearInterval(enemy.triggeredInterval);
            clearInterval(enemy.updateHitboxInterval);
        }
    });
    world.level.clouds.forEach(cloud => {
        clearInterval(cloud.cloudsAnimationInterval);
    });
    clearInterval(world.checkCollisionsInterval);
    clearInterval(world.bottleThrowInterval);
}

/**
 * adds eventlistener to different keys on keyboard onkeydown, so the user can navigate on keydown
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.key === ' ') {
        keyboard.SPACE = true;
    }
    if (e.key === 'd') {
        keyboard.D = true;
    }
});

/**
 * adds eventlistener to different keys on keyboard onkeyup, so the user input stops onkeyup
 */
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.key === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.key === ' ') {
        keyboard.SPACE = false;
    }
    if (e.key === 'd') {
        keyboard.D = false;
    }
});

/**
 * adds eventlistener to buttons on screen, so the user can navigate with clicking and pressing buttons
 */
function setEventListener() {
    //---------------------- touch
    document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('buttonRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('buttonJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('buttonJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('buttonThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('buttonThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

    // --------------------- click
    document.getElementById('buttonLeft').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('buttonLeft').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('buttonRight').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('buttonRight').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('buttonJump').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('buttonJump').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('buttonThrow').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('buttonThrow').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}