
var board = [];

function solve(){
    makeBoard();
    if(solver(0,0) == false){
        alert("Not Possible");
    }
    fillBoard();
}

function makeBoard(){
    for(let  i = 0; i < 9; i++){
        board[i] = [];
    }
    let count = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let pos = "cell-".concat(count);
            let x =  document.getElementById(pos).value;
            if(x.trim() != ""){
                board[i][j] = Number(x);
                document.getElementById(pos).disabled = true; 
            }
            else{
                board[i][j] = -1;
            }
            count = count + 1;
        }
    }

}

function fillBoard(){
    let count = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let pos = "cell-".concat(count);
            // console.log(board[i][j]);
            document.getElementById(pos).value = board[i][j];
            
            count = count + 1;
        }
    }
}

function isSafe(row, col, x){
    for(let i = 0; i < 9; i++){
        if(board[row][i] != -1 & board[row][i] == x) return false;
        if(board[i][col] != -1 & board[i][col] == x) return false;
    }
    
    let top = (Math.floor(row/3))*3;
    let left = (Math.floor(col/3))*3;

    for(let i = top; i < top + 3; i++){
        for(let j = left; j < left + 3; j++){
            if(i == row & j == col) continue;
            if(board[i][j] != -1 & board[i][j] == x) return false;
        }
    }
    return true;

}

function solver(row, col){
    if(row == 9)return true;
    if(col == 9)return solver(row + 1, 0);
    if(board[row][col] > 0) return solver(row, col + 1);
    for(let x = 1; x <= 9; x++){
        if(isSafe(row, col ,x)){
            board[row][col] = x; 
            let ok = solver(row, col + 1);
            if(ok) return true;
            board[row][col] = -1;
        }
    }
    return false;
}

function reset(){
    let count = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let pos = "cell-".concat(count);
            if(document.getElementById(pos).disabled == false){
                document.getElementById(pos).value = "";
            }
            count = count + 1;
        }
    }
}

function erase_all(){
    let count = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let pos = "cell-".concat(count);
            document.getElementById(pos).disabled = false;
            document.getElementById(pos).value = "";
            count = count + 1;
        }
    }
}
