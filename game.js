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
loadSprite("ship", "hero_white.png");

for (const obj of objs) {
	loadSprite(obj, `${obj}.png`);
}

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

    //add instructions
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

    //add player
	const player = add([
		sprite("ship"),
		pos(width() - 230, height() / 2),
        rotate(4.7),
		origin("center"),
	]);

    //player controls
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

    //player collision
	player.collides("enemy", (e) => {
		destroy(e);
		destroy(player);
		camShake(120);
		wait(1, () => {
			go("main");
		});
	});

    //function for spawning enemies
	function spawnTrash() {
		const name = choose(objs.filter(n => n != "bossName"));
        
        
		add([
			sprite(name),
			pos(width(), rand(20, height() - 40)),
			origin("left"),
			"trash",
			"enemy",
			{
				speed: rand(TRASH_SPEED * 0.5, TRASH_SPEED * 1.5),
			},
		]);
		wait(0.3, spawnTrash);
	}

    //after spawning enemies will do this action (move)
	action("trash", (t) => {
		t.move(-t.speed, 0);
		if (t.pos.x - t.width < width() - 280) {
			destroy(t);
		}
	});

	//spawnTrash();

    /*
        TO DO:
        1. Need to implement bullets
        2. Need to implement and spawn more enemy types
        3. Need to implement Bosses and boss health
        4. Need to implement levels with different backgrounds and enemies/bosses
        5. Need to implement score and Game Over screen

    */

});

go("main");
