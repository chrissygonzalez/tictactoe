var gameStatus = [];
var player = 0;
    
document.body.onload = createGame(3);

function createGame(size){
    drawBoard(size);

    function drawBoard(size){
        var board = document.getElementById("board");
        for (var i = 0; i < size; i++){
            var row = [];
            gameStatus.push(row);
            for (var j = 0; j < size; j++){
                var div = document.createElement("div");
                var squarename = "square" + i + j;    
                div.name = squarename;
                div.setAttribute("id", squarename);
                div.classList.add("empty", "square");
                div.addEventListener("click", clicked, false);
                board.appendChild(div);
                gameStatus[i].push("E");
            }
        }
    }
    setInstructions("X", 1);
}

function clicked(e){
    var thisSquare = document.getElementById(this.name);
    checkSquare(thisSquare);
}

function checkSquare(square){
    if(square.classList.contains("empty")){
        if(player === 0){
            setSquareStyle(square, "exes");
            switchPlayer(1);
            setInstructions("O", 2);
            updateGameStatus(square, "X");
        } else {
            setSquareStyle(square, "ohs");
            switchPlayer(0);
            setInstructions("X", 1);
            updateGameStatus(square, "O");
        }
    }
}

function setSquareStyle(square, style){
    square.classList.remove("empty");
    square.classList.add(style);
}

function switchPlayer(num){
    player = num;
    return player;
}

function setInstructions(char, num){
    var instructions = document.getElementById("instructions");
    instructions.textContent = "Place your " + char + ", player " + num + "!";        
}

function updateGameStatus(square, char){
    var squareStr = square.name;
    gameStatus[squareStr.substr(6, 1)][squareStr.substr(7,1)] = char;
    scoreChecker();
}

function scoreChecker(){
    var row1 = [gameStatus[0][0], gameStatus[0][1], gameStatus[0][2]];
    var row2 = [gameStatus[1][0], gameStatus[1][1], gameStatus[1][2]];
    var row3 = [gameStatus[2][0], gameStatus[2][1], gameStatus[2][2]];
    var col1 = [gameStatus[0][0], gameStatus[1][0], gameStatus[2][0]];
    var col2 = [gameStatus[0][1], gameStatus[1][1], gameStatus[2][1]];
    var col3 = [gameStatus[0][2], gameStatus[1][2], gameStatus[2][2]];
    var diag1 = [gameStatus[0][0], gameStatus[1][1], gameStatus[2][2]];
    var diag2 = [gameStatus[2][0], gameStatus[1][1], gameStatus[0][2]];
    var waysToWin = [row1, row2, row3, col1, col2, col3, diag1, diag2];
    for(var i = 0; i < waysToWin.length; i++){
        scoreGame(waysToWin[i]);
    }
}

function scoreGame(arr){
    if( arr[0] === "X" &&
        arr[1] === "X" &&
        arr[2] === "X"){
        console.log("X wins!");
    } else if (
        arr[0] === "O" &&
        arr[1] === "O" &&
        arr[2] === "O"){
        console.log("O wins!");
    }
}

