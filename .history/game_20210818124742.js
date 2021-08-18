

// options
kaboom({
    global: true, // import all kaboom functions to global namespace
    scale: 1, // pixel size (for pixelated games you might want smaller size with scale)
    fullscreen: true, // if fullscreen
    crisp: true, // if pixel crisp (for sharp pixelated games)
    //clearColor: [0, 0, 0, 1], // background color (default is a checker board background)
    debug: true, // debug mode
});

loadRoot("/sprites/");
loadSprite("hero", "hero.png");
loadSprite("enemy_jellyfish", "enemy_jellyfish.png");

add([
	sprite("hero"),
	pos(100, 100),
]);