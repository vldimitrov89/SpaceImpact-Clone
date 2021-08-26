	//object with enemies
	const objs = [
		"enemy_jellyfish_white",
		"enemy_ship1_white",
		"enemy_ship2_white",
		"enemy_ship3_white",
	];

	//load sprites
	loadRoot("/sprites/");
	loadSprite("ship", "hero_white.png");
	loadSprite("bullet", "bullet.png");
	loadSprite("boss1", "boss1_white.png");

	for (const obj of objs) {
		loadSprite(obj, `${obj}.png`);
	}

export default function Sprites() {
    return objs;
}


//object with enemies
const objs_inv = [
	"enemy_jellyfish",
	"enemy_ship1",
	"enemy_ship2",
	"enemy_ship3"
];

//load sprites
loadRoot("/sprites/");
loadSprite("bullet", "bullet.png");
loadSprite("ship_inv", "hero_black.png");
loadSprite("background_invert", "white.png");

for (const obj of objs_inv) {
	loadSprite(obj, `${obj}.png`);
}

export function SpritesInvert() {
    return objs_inv;
}