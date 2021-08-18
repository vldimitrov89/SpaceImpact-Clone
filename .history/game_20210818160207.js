//inititialize cnvas and kaboom
kaboom({
	global: true,
	//fullscreen: true,
	clearColor: [0, 0, 0, 1], // background color
    canvas: document.getElementById("space_shooter"), //choosing a canvas this way to get it in a div element
	scale: 3,
	debug: true,
    width: 250, // width of canvas
    height: 150, // height of canvas
});

//object with enemies
const objs = [
	"enemy_jellyfish_white",
];

//load sprites
loadRoot("/sprites/");
//loadSprite("stars", "img/stars.png");
loadSprite("ship", "hero_white.png");

for (const obj of objs) {
	loadSprite(obj, `${obj}.png`);
}

// loadSound("hit", "sounds/hit.mp3");
// loadSound("shoot", "sounds/shoot.mp3");

// load main scene
scene("main", () => {

    //global configs
	const BULLET_SPEED = 320;
	const TRASH_SPEED = 48;
	const BOSS_SPEED = 12;
	const PLAYER_SPEED = 120;
	const STAR_SPEED = 32;
	const BOSS_HEALTH = 1000;
	const OBJ_HEALTH = 4;

	layers([
		"game",
		"ui",
	], "game");

	camIgnore(["ui"]);

	add([
		text(`
            up: insane mode
left:  move left
right: move right
space: shoot
		`.trim(), 4),
		origin("botleft"),
		pos(4, height() - 4),
		layer("ui"),
	]);

	const player = add([
		sprite("ship"),
		pos(width() - 230, height() / 2),
        rotate(4.7),
		origin("center"),
	]);

	keyDown("up", () => {
        if((player.pos.y - 10) > 0) {
            player.move(0, -PLAYER_SPEED);
        }
	});

	keyDown("down", () => {
        if(player.pos.y < height() - 40) {
            player.move(0, PLAYER_SPEED);
        }
	});

	player.collides("enemy", (e) => {
		destroy(e);
		destroy(player);
		camShake(120);
		wait(1, () => {
			go("main");
		});
	});

	function spawnTrash() {
		const name = choose(objs.filter(n => n != "bossName"));
        
		add([
			sprite(name),
			pos(width(), rand(20, height() - 40)),
			//health(OBJ_HEALTH),
			origin("left"),
			"trash",
			"enemy",
			{
				speed: rand(TRASH_SPEED * 0.5, TRASH_SPEED * 1.5),
			},
		]);
		wait(0.3, spawnTrash);
	}

	action("trash", (t) => {
		t.move(-t.speed, 0);
		if (t.pos.x - t.width < width() - 280) {
			destroy(t);
		}
	});

	//spawnTrash();

});

go("main");
