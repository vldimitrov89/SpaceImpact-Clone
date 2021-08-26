import { k } from '../configs/global_config.js';
import uiConfig from '../configs/ui_config.js';
import playerConfig from '../player.js';
import GameOver from './game_over.js';
import LevelTwo from '../levels/level_2.js';

const BULLET_SPEED = 320;
const TRASH_SPEED = 48;
const BOSS_SPEED = 12;
const PLAYER_SPEED = 120;
const BOSS_HEALTH = 10;
const TRASH_HEALTH = 3;



export default function LevelOne(objs) {

    k.scene("level1", (objs) => {
        let score = 0;

        uiConfig();

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

        const player = playerConfig();

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

        keyPress("right", () => {
            spawnBullet(player.pos);
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

        on("death", "boss", (b) => {
            LevelTwo();
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
                health(TRASH_HEALTH),
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
                
                add([
                    sprite("boss1"),
                    pos(width() - 60, height() / 2),
                    origin("left"),
                    scale(2),
                    health(BOSS_HEALTH),
                    "enemy",
                    "boss",
                    {
                        dir: -1,
                    }
                ]);
            }
            
        }

        action("boss", (b) => {
            if(b.pos.y > height() - 54) {
                b.dir = -1;
            } else if(b.pos.y < 54) {
                b.dir = 1;
            }
            b.move(0, BOSS_SPEED * b.dir);
            
        });

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
                GameOver(score);
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

    go("level1", objs);

}