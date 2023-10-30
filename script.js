const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Draw';
    }

    return null;
}

function handleClick(event) {
    const cell = event.target;
    const cellIndex = cell.id;

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.style.backgroundColor = currentPlayer === 'X' ? '#4CAF50' : '#2196F3';

        const winner = checkWinner();
        if (winner) {
            if (winner === 'Draw') {
                message.innerText = "It's a Draw!";
            } else {
                message.innerText = `${winner} Wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `${currentPlayer}'s Turn`;
        }
    }
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.innerText = "Let's Play!";
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#4CAF50';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);
