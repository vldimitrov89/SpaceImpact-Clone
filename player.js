
//add player
export default function() {
    return add([
        sprite("ship"),
        pos(width() - 230, height() / 2),
        rotate(4.7),
        origin("center"),
    ]);
}