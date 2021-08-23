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
	"enemy_ship1_white",
	"enemy_ship2_white",
	"enemy_ship3_white"
];

//load sprites
loadRoot("/sprites/");
loadSprite("ship", "hero_white.png");
loadSprite("bullet", "bullet.png");

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
	const BOSS_HEALTH = 1000;
	const OBJ_HEALTH = 3;

	let score = 0;
	
	layers([
		"game",
		"ui",
	], "game");

	camIgnore(["ui"]);

    //add instructions
	add([
		text(`
up:  move up
down: move down
right: shoot
		`.trim(), 4),
		origin("botleft"),
		pos(4, height() - 4),
		layer("ui"),
	]);

	//add top UI
	add([
		text("Space Shooter", 6),
		origin("topleft"),
		pos(4, 5),
		layer("ui"),
	]);

	
	// display score
	const scorePoints = add([
		text(`Score: ${score}`, 6),
		origin("topleft"),
		pos(width() - 70, 5),
		layer("ui"),
	]);

	function addScore() {
		score++;
		scorePoints.text = `Score: ${score}`;
	}

    //add player
	const player = add([
		sprite("ship"),
		pos(width() - 230, height() / 2),
        rotate(4.7),
		origin("center"),
	]);

    //player controls
	keyDown("up", () => {
        if((player.pos.y - 30) > 0) {
            player.move(0, -PLAYER_SPEED);
        }
	});

	keyDown("down", () => {
        if(player.pos.y < height() - 40) {
            player.move(0, PLAYER_SPEED);
        }
	});

	// Health function
	function health(hp) {
		return {
			hurt(n) {
				hp -= (n === undefined ? 1 : n);
				if (hp <= 0) {
					this.trigger("death");
				}
			},
			hp() {
				return hp;
			},
		};
	}
	
	on("death", "enemy", (e) => {
		destroy(e);
	});
	
	//function to spawn bullet
	function spawnBullet(p) {
		add([
			sprite("bullet"),
			pos(p),
			origin("right"),
			color(1, 1, 1),
			"bullet",
		]);
	}

	keyPress("right", () => {
		spawnBullet(player.pos);
	});

	// run this callback every frame for all objects with tag "bullet"
	action("bullet", (b) => {
		b.move(BULLET_SPEED, 0);
		// remove the bullet if it's out of the scene for performance
		if (b.pos.x > width()) {
			destroy(b);
		}
	});

    //function for spawning enemies
	function spawnTrash() {
		const name = choose(objs);
        
		add([
			sprite(name),
			pos(width(), rand(30, height() - 40)),
			health(OBJ_HEALTH),
			origin("left"),
			"trash",
			"enemy",
			{
				speed: rand(TRASH_SPEED * 0.5, TRASH_SPEED * 1.5),
			},
		]);
		
		if(score <= 12) {
			wait(rand(1.0, 2.0), spawnTrash);
		} else {
			destroyAll("trash");
			//TO DO: spawn boss
		}
		
	}

    //after spawning enemies will do this action (move)
	action("trash", (t) => {
		t.move(-t.speed, 0);
		if (t.pos.x - t.width < width() - 280) {
			destroy(t);
		}
	});

	spawnTrash();

	//player collision
	player.collides("enemy", (e) => {
		destroy(e);
		destroy(player);
		camShake(120);
		wait(1, () => {
			go("game_over", score);
		});
	});

	//bullet collision
	collides("bullet", "enemy", (b, e) => {
		destroy(b);
		//trigger "hurt" and reduce health
		e.hurt(1);
		addScore();
	});

});

scene("game_over", (score) => {

	add([
		text("Game Over", 21),
		origin("center"),
		pos(width() / 2, height() / 2),
	]);

	add([
		text(`Your Score: ${score}`, 10),
		origin("center"),
		pos(width() / 2, height() - 50),
	]);

	const restartBtn = add([
		pos(width() / 2, height() - 20),
		rect(63, 20),
		origin("center"),
		color(1, 1, 1),
	]);

	add([
		text("Restart", 8),
		pos(width() / 2, height() - 20),
		origin("center"),
		color(0, 0, 0),
	]);

	restartBtn.action(() => {
		if (restartBtn.isHovered()) {
			restartBtn.color = rgb(0.8, 0.8, 0.8);
			if (mouseIsClicked()) {
				go("main");
			}
		} else {
			restartBtn.color = rgb(1, 1, 1);
		}
	});


});

go("main");
