const gameTails = document.querySelectorAll('.tile');
const gameBoard = document.querySelector('#game-board');
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]

gameState = [
    [gameTails[0], gameTails[1], gameTails[2]],
    [gameTails[3], gameTails[4], gameTails[5]],
    [gameTails[6], gameTails[7], gameTails[8]]
]

let counter = 0
const cout = () => {
    counter++
    document.querySelector('.counter').innerText = `u try ${counter} times`
}


function render(gameBoard, gameState) {
    gameState.forEach((row, rowIndex) => {

        row.forEach((column, columnIndex) => {

            column.style.top = `${rowIndex *100}px`
            column.style.left = `${columnIndex *100}px`
            do {
                let nr

                function getRandom(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    nr = Math.floor(Math.random() * (max - min + 1)) + min;
                }
                getRandom(0, 8)
                if (gameBoard.innerText.includes(nr)) {
                    nr = `${Math.floor(Math.random()*10) }`
                } else {
                    if (nr === 0) {
                        column.classList.add('emptyItem');
                        column.innerText = `${arr[nr]}`
                    }
                    column.innerText = `${arr[nr]}`
                }
            }
            while (column.innerText === '' || column.innerText === 0)








            gameBoard.appendChild(column)
        })
    })
    console.log(gameBoard.innerText);


}

function moveElement(element1, element2) {
    const tempTop = element1.style.top;
    const tempLeft = element1.style.left;

    element1.style.top = element2.style.top
    element1.style.left = element2.style.left

    element2.style.top = tempTop
    element2.style.left = tempLeft
}
render(gameBoard, gameState)

gameBoard.addEventListener('click', (e) => {
    const target = e.target;
    let x, y
    gameState.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if (column === target) {
                x = rowIndex;
                y = columnIndex
            }

        })

    });
    let emptyX, emptyY
    gameState.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if (column.innerHTML === '0') {
                emptyX = rowIndex;
                emptyY = columnIndex
            }
        })
    });


    if (
        (y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) ||
        (x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))
    ) {
        cout()
        const temp = gameState[x][y];
        gameState[x][y] = gameState[emptyX][emptyY];
        gameState[emptyX][emptyY] = temp;

        moveElement(gameState[x][y], gameState[emptyX][emptyY])


    }





})