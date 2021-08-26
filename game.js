import { k } from './configs/global_config.js';
import sprites from './sprites.js';
import LevelOne from './levels/level_1.js';
import MainMenu from './levels/main_menu.js';

const objs = sprites();

// load main scene
MainMenu(objs);



