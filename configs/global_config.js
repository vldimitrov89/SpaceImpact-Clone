
export const k = kaboom({
    global: true,
    //fullscreen: true,
    clearColor: [0, 0, 0, 1], // background color
    canvas: document.getElementById("space_shooter"), //choosing a canvas this way to get it in a div element
    scale: 3,
    debug: true,
    width: 250, // width of canvas
    height: 150, // height of canvas
});