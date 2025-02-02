var rows = 3
var column = 3

var currentTile; 
var otherTile; //blank title-> target title which u r going to swap it

var turns = 0;
//var imgOrder = ["1","2","3","4","5","6","7","8","9"];

var imgOrder = shuffleArray(['4',"2","9","8","1","6","3","5","7"])

window.onload = function(){
    for(let r = 0;r < rows;r++){
        for(let c = 0;c < column;c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click an image to drag
            tile.addEventListener("dragover",dragOver); //moving an image around while clicked
            tile.addEventListener("dragenter",dragEnter); //dragging image onto naother one
            tile.addEventListener("dragleave",dragLeave) //dragged image leaving another image
            tile.addEventListener("drop",dragDrop); //drag an image over another image, drop the image
            tile.addEventListener("dragend",dragEnd); //after drag drop,swap the two tiles

            document.getElementById("board").append(tile);
        }
    }
}

function shuffleArray(array){
    for(let i = array.length - 1;i > 0;i--){
        const j = Math.floor(Math.random() * i + 1);
        [array[i],array[j]] = [array[j],array[i]];
    }
    return array
}

function dragStart(){
    currentTile = this; //this refers to the img tile deing dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd(){

    if(!otherTile.src.includes("3.jpg")){
        return;
    }

    let currentCoords = currentTile.id.split("-");
    let r = parseInt(currentCoords[0]);
    let c = parseInt(currentCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown

    if(isAdjacent){
        let currentImg = currentTile.src;
        let otherImg = otherTile.src

        currentTile.src = otherImg;
        otherTile.src = currentImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}

function checkWinner() {
    let correctOrder = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"];
    let tiles = document.querySelectorAll("#board img");
    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].src.includes(correctOrder[i])) {
            return;
        }
    }
    alert("🎉 Congratulations! You've solved the puzzle! 🎉");
} 
