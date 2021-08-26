//object with enemies
const objs = [
	"enemy_jellyfish_white",
	"enemy_ship1_white",
	"enemy_ship2_white",
	"enemy_ship3_white"
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