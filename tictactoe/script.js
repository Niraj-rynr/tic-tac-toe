document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const popup = document.getElementById('popup');
    const winnerMessage = document.getElementById('winner-message');
    const newGameBtn = document.getElementById('new-game-btn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.dataset.index;

            if (gameBoard[index] === '' && gameActive) {
                gameBoard[index] = currentPlayer;
                cell.textContent = currentPlayer;
                checkWinner();
                togglePlayer();
            }
        });
    });

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                highlightWinnerCells(combo);
                showWinnerPopup(`${gameBoard[a]} wins!`);
            }
        }

        if (!gameBoard.includes('') && gameActive) {
            gameActive = false;
            showWinnerPopup('It\'s a tie!');
        }
    }

    function highlightWinnerCells(cells) {
        for (const index of cells) {
            document.querySelector(`.cell[data-index="${index}"]`).style.backgroundColor = '#c1f0c1';
        }
    }

    function showWinnerPopup(message) {
        winnerMessage.textContent = message;
        popup.style.display = 'flex';

        newGameBtn.addEventListener('click', () => {
            resetGame();
            popup.style.display = 'none';
        });
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = 'white';
        });

        currentPlayer = 'X';
    }
});
