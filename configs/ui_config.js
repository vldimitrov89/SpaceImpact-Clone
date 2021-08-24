
export default function() {
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
}