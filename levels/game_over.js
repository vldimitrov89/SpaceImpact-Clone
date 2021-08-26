import { k } from '../configs/global_config.js';
import LevelOne from './level_1.js';
import sprites from '../sprites.js';

export default function GameOver(score) {
    
    k.scene("game_over", () => {
    
        add([
            text("Game Over", 21),
            origin("center"),
            pos(width() / 2, height() / 3),
        ]);

        add([
            text(`Your Score: ${score}`, 10),
            origin("center"),
            pos(width() / 2, height() - 70),
        ]);

        const restartBtn = add([
            pos(width() / 2, height() - 35),
            rect(63, 20),
            origin("center"),
            color(1, 1, 1),
        ]);

        add([
            text("Restart", 8),
            pos(width() / 2, height() - 35),
            origin("center"),
            color(0, 0, 0),
        ]);

        restartBtn.action(() => {
            if (restartBtn.isHovered()) {
                restartBtn.color = rgb(0.8, 0.8, 0.8);
                if (mouseIsClicked()) {
                    LevelOne(sprites());
                }
            } else {
                restartBtn.color = rgb(1, 1, 1);
            }
        });

    });

    k.go("game_over");

}