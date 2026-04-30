const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const scoreDisplay = document.getElementById('score');

let turn = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let score = { X: 0, O: 0 };
let gameOver = false;

// Winning combinations
const winCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.textContent === '' && !gameOver) {
      cell.textContent = turn;
      board[index] = turn;
      checkWinner();
      turn = turn === 'X' ? 'O' : 'X';
      if(!gameOver) status.textContent = `Turn: ${turn}`;
    }
  });
});

// Check winner
function checkWinner() {
  for (let combo of winCombinations) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      status.textContent = `${board[a]} Wins!`;
      score[board[a]]++;
      updateScore();
      highlightWinner(combo);
      return;
    }
  }
  if (!board.includes('')) {
    gameOver = true;
    status.textContent = "It's a Draw!";
  }
}

// Highlight winning cells
function highlightWinner(combo) {
  combo.forEach(index => cells[index].style.background = '#90ee90');
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = `X: ${score.X} | O: ${score.O}`;
}

// Reset game
resetBtn.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.background = '';
  });
  gameOver = false;
  turn = 'X';
  status.textContent = `Turn: ${turn}`;
});
