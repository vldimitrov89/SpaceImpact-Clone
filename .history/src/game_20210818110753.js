

// options
kaboom({
    global: true, // import all kaboom functions to global namespace
    width: 640, // width of canvas
    height: 480, // height of canvas
    scale: 1, // pixel size (for pixelated games you might want smaller size with scale)
    fullscreen: true, // if fullscreen
    crisp: true, // if pixel crisp (for sharp pixelated games)
    debug: true, // debug mode
});

screen("game", () => {});

start("game");