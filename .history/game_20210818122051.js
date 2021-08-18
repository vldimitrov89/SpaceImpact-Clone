

// options
kaboom({
    global: true, // import all kaboom functions to global namespace
    scale: 1, // pixel size (for pixelated games you might want smaller size with scale)
    fullscreen: true, // if fullscreen
    crisp: true, // if pixel crisp (for sharp pixelated games)
    clearColor: [1, 1, 1, 1], // background color (default is a checker board background)
    debug: false, // debug mode
});

loadSprite('hero', "./spriteс/hero.png");


scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const levelOne = [
        '                                                     ',
        '                                                     ',
        '                                                     ',
        '                                                     ',
        '                                                     ',
        '                                                     ',
        '                                                     ',
        '                                                     ',
        '                                                     ',
        '====================================================='
    ];

    const levelConfig = {
        width: 20,
        height: 20,
        
    };

    const gameLevel = addLevel(map, levelConfig);

    const player = add([
        sprite('spaceship', solid()),
        pos(30, 0),
        body(),
        origin('bot')
    ]);

});

start("game");