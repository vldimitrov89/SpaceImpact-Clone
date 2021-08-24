

export default function(score) {

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

    go("game_over", score);
}