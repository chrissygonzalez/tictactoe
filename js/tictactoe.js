var instructions = document.getElementById("instructions");
var player = 0;
    
document.body.onload = createGame(9);

function createGame(size){
    drawBoard(size);

    function drawBoard(size){
        var board = document.getElementById("board");
        for (var i = 0; i < size; i++){
            var div = document.createElement("div");
            var squarename = "square" + i;    
            div.name = squarename;
            div.setAttribute("id", squarename);
            setSquareStyle(div, "empty");
            div.classList.add("empty", "square");
            div.addEventListener("click", clicked, false);
            board.appendChild(div);
        }
    }
    
    setInstructions();
}

function clicked(e){
    var thisSquare = document.getElementById(this.name);
    setSquareStyle(thisSquare);
    switchPlayer();
    setInstructions();
}

function setSquareStyle(square){
    if(square.classList.contains("empty")){
        square.classList.remove("empty");
        if(player === 0) {
            square.classList.add("exes");
        } else {
            square.classList.add("ohs");
        }
    }
}

function setInstructions(){
    if(player === 0){
        instructions.textContent = "Place your X, player 1!";        
    } else {
        instructions.textContent = "Place your O, player 2!";        
    }
}

function switchPlayer(){
    if(player === 0){
        player = 1;
    } else {
        player = 0;
    }
    return player;
}
