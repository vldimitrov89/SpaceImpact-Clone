

// options
kaboom({
    global: true, // import all kaboom functions to global namespace
    scale: 1, // pixel size (for pixelated games you might want smaller size with scale)
    fullscreen: true, // if fullscreen
    crisp: true, // if pixel crisp (for sharp pixelated games)
    clearColor: [0, 0, 0, 1], // background color (default is a checker board background)
    debug: true, // debug mode
});

loadSprite('spaceship','./sprites/hero.png');

scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')
});

//start("game");