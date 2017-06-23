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
}

function clicked(e){
    var thisSquare = document.getElementById(this.name);
    setSquareStyle(thisSquare);
}

function setSquareStyle(square){
    var styles = ["empty", "exes", "ohs"];
    for (var i = 0; i < styles.length; i++){
        if(square.classList.contains(styles[i])) {
            square.classList.remove(styles[i]);
            if(i == styles.length - 1) {
                square.classList.add(styles[0]);
            } else {
            square.classList.add(styles[i+1]);
            }
            break;
        }
    } 
}

