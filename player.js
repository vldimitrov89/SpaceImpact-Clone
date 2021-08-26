//add player
export default function Player() {
    return add([
        sprite("ship"),
        pos(width() - 230, height() / 2),
        rotate(4.7),
        origin("center"),
    ]);
}

export function PlayerInvert() {
    return add([
        sprite("ship_inv"),
        pos(width() - 230, height() / 2),
        rotate(4.7),
        origin("center"),
    ]);
}