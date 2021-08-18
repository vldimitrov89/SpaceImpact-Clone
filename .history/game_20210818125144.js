

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

scene("main", (levelIdx) => {
    const SPEED = 80;

    const characters = {};

    const levels = [
		[
			"=======|==",
			"=        =",
			"= a      =",
			"=        =",
			"=        =",
			"=    $   =",
			"=        =",
			"=        =",
			"=   @    =",
			"==========",
		],
		[
			"==========",
			"=        =",
			"=  $     =",
			"=        =",
			"|        =",
			"=        =",
			"=      b =",
			"=        =",
			"=   @    =",
			"==========",
		],
	];

    addLevel(levels[levelIdx], {
		width: 11,
		height: 11,
		pos: vec2(20, 20),
		"=": [
			// sprite("steel"),
			// solid(),
		],
		"$": [
			// sprite("key"),
			// "key",
		],
		"@": [
			sprite("hero"),
			"player",
		],
		"|": [
			// sprite("door"),
			// solid(),
			// "door",
		],
		// any(ch) {
		// 	const char = characters[ch];
		// 	if (char) {
		// 		return [
		// 			sprite(char.sprite),
		// 			solid(),
		// 			"character",
		// 			{
		// 				msg: char.msg,
		// 			},
		// 		];
		// 	}
		// },
	});

	const player = get("player")[0];

});

go("main", 0);
