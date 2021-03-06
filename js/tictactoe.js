var gameStatus = [];
var player = 0;
    
document.body.onload = initGame();

function initGame(){
    var onePlayerbtn = document.getElementById("1player");
    var twoPlayerbtn = document.getElementById("2player");
    var content = document.getElementsByClassName("content")[0];
    onePlayerbtn.addEventListener("click", function(){
        content.removeChild(this);
        content.removeChild(twoPlayerbtn);
        drawBoard(3);}, false);
    twoPlayerbtn.addEventListener("click", function(){
        content.removeChild(this);
        content.removeChild(onePlayerbtn);
        drawBoard(3);}, false);
}

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
            div.addEventListener("click", checkSquare, false);
            board.appendChild(div);
            gameStatus[i].push("E");
        }
    }
}

function checkSquare(){
    var square = this;
    var squareStr = this.name;
    if(gameStatus[squareStr.substr(6, 1)][squareStr.substr(7,1)] == "E"){
        if(player === 0){
            setSquareStyle(square, "exes");
            switchPlayer(1);
            updateGameStatus(square, "X");
        } else {
            setSquareStyle(square, "ohs");
            switchPlayer(0);
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
        declareWinner("X");
    } else if (
        arr[0] === "O" &&
        arr[1] === "O" &&
        arr[2] === "O"){
        declareWinner("O");
    }
}

function declareWinner(winner){
    var outcome = document.getElementById("outcome");
    var board = document.getElementById("board");
    var squareList = board.childNodes;
    
    outcome.textContent = winner + " wins!";
    if(winner == "X"){
        outcome.classList.add("extext");
    } else {
        outcome.classList.add("ohtext");
    }
    for(var i = 0; i < squareList.length; i++){
       // squareList[i].removeEventListener("click", null, false);
        squareList[i].removeEventListener("click", checkSquare, false);
        squareList[i].classList.remove("empty");
        squareList[i].classList.add("border");
    }
}
