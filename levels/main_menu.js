import { k } from '../configs/global_config.js';
import LevelOne from './level_1.js';

export default function MainMenu() {
    
    k.scene("main_menu", () => {
    
        add([
            text("Space Shooter", 17),
            origin("center"),
            pos(width() / 2, height() / 3),
        ]);

        const playtBtn = add([
            pos(width() / 2, height() / 1.5),
            rect(63, 20),
            origin("center"),
            color(1, 1, 1),
        ]);

        add([
            text("Play", 8),
            pos(width() / 2, height() / 1.5),
            origin("center"),
            color(0, 0, 0),
        ]);

        playtBtn.action(() => {
            if (playtBtn.isHovered()) {
                playtBtn.color = rgb(0.8, 0.8, 0.8);
                if (mouseIsClicked()) {
                    LevelOne();
                }
            } else {
                playtBtn.color = rgb(1, 1, 1);
            }
        });

    });

    k.go("main_menu");

}