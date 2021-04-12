function createChessBoard() {

    let column = [];
    let row = [];

    function cell(i) {
        let cell = document.createElement('div');
        

            cell.style.width = "11.111%";
            cell.style.height = "11.111%";
            cell.style.display = "flex";
            cell.style.alignItems = "center";
            cell.style.justifyContent = "center";

            if (i == 81) cell.style.backgroundColor = "none";
            else if(i % 9 == 0) {
                cell.style.backgroundColor = "none";
                row.unshift(cell); 
            }
            else if(i > 72) {
                cell.style.backgroundColor = "none";
                column.push(cell); 
            }
            else if (i % 2 == 0) cell.style.backgroundColor = "brown";
            else cell.style.backgroundColor = "gold";

            return cell;
    }

    function rowNaming(arr) {
        for (let i = 1; i <= arr.length; i++) {
        arr[i-1].innerHTML = i;
        }
    }

    function colNaming(arr) {
        let alphabet = ['A','B','C','D','E','F','G','H'];
        for (let i = 0; i < arr.length; i++) {
        arr[i].innerHTML = alphabet[i];
        }
    }

  let board = document.createElement('div') 
    board.style.display = "flex";
    board.style.flexWrap = "wrap";
    board.style.width = "450px";
    board.style.height = "450px";
    board.style.margin = "0 auto";

    for(let i = 1; i<=81; i++) {
        board.appendChild(cell(i));
    }

    rowNaming(row);
    colNaming(column);

    return board;
}

let body = document.getElementsByTagName('body')[0];
body.appendChild(createChessBoard());

