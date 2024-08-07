var rows = 3;
var columns = 3;

var currTile; //reference the tile you click and switch with 
var otherTile; //reference the target tile you want to swap with
//So 'otherTile' should be 'blank tile' under game rule. 
//game rule: Only move to the empty blank tile. (file name is 3.jpg)

var turns = 0; //turns is initialized to 0 to keep track of the number of moves made.

//var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
//Now scramble and shuffle the orders.
// Fisher-Yates shuffle algorithm to randomize imgOrder array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
shuffleArray(imgOrder); // Randomly shuffle the imgOrder array




//window.onload is an event that triggers when the entire page has loaded. 
//It ensures that the script runs only after the page is fully loaded.
window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString(); 
            //this will give the location of current tile ex: id="1-2"
            //0-0, 0-1, 0-2, 1-0, 1-1, 1-2, 2-0, 2-1, 2-2 
            tile.src = "./images/" + imgOrder.shift() + ".jpg";
            //ex: src = "1.jpg"


            //DRAG DROP functionality : we need to add several event-listeners.
            tile.addEventListener("dragstart", dragStart); //click an image to drag
            tile.addEventListener("dragover", dragOver);   //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave); //dragged image leave another image
            tile.addEventListener("drop", dragDrop);       //drag an image over another image, drop and let go the image
            tile.addEventListener("dragend", dragEnd);     //after drag drop, swap the two tiles



            document.getElementById("board").append(tile);
            //which means, we take this tag "id="0-0", src="1.jpg",
            //and insert it in board. repeated 9 times because we have 9 pieces. 
            // <img id="0-0" src="1.jpg">
            // <img id="0-1" src="2.jpg">
            // <img id="0-2" src="3.jpg">.... etc.
            // We don't need to write whole these codes, so we put for loop instead.
        }
    }
}


function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

//afterwards, here is when we swap.
function dragEnd() {

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    //To check adjacency, we need to check for left / right/ up and down.
    let moveLeft = r == r2 && c2 == c-1; //in the same row / column move to left
    let moveRight = r == r2 && c2 == c+1;
    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    //if it is adjacent, then we swap.
    if (isAdjacent) {
       let currImg = currTile.src;
       let otherImg = otherTile.src;

       currTile.src = otherImg;
       otherTile.src = currImg;
           //So, we're not really swapping positions of tiles
           //instead we're swapping their images.
    }

}