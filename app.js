const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const playerName = ['Player 1', 'Player 2'];
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let currentPlayer;

function hasWinner(board) {
  for (let i = 0; i < 3; i++) {
    const row = board[i];
    const col = [];
    for (let j = 0; j < 3; j++) {
      col.push(board[j][i]);
    }
    if (row.every(e => e === 'O') || row.every(e => e === 'X')) return true;
    if (col.every(e => e === 'O') || col.every(e => e === 'X')) return true;
  }

  if (dia.every(e => e === 'O') || dia.every(e => e === 'X')) return true;
  return false;
}

function setName(playerNum, cb) {
  rl.question(`May I have your name, Player ${playerNum}? (Press enter to default to 'Player ${playerNum}') > `, (input) => {
    if (input !== '') {
      playerName[playerNum - 1] = input;
    }
    currentPlayer = playerName[0];
    cb();
  })
}

function isInputValid(input, board) {
  if (input.length < 2 || input.length > 2) return false;
  const num1 = parseInt(input[0]);
  const num2 = parseInt(input[1]);
  if (!num1 || num1 < 0 || num1 > 2) return false;
  if (!num2 || num2 < 0 || num2 > 2) return false;
  if (board[num1][num2] !== '') return false;
  return true;
}

function startGame() {
  console.table(board);
  rl.question(`'${currentPlayer}' enter row & column index: (row, col) > `, (input) => {
    if (!isInputValid(input, board)) {
      console.log(`${input} is not Valid`);
      return startGame();
    }

    const rowIndex = input[0];
    const colIndex = input[1];

    if (currentPlayer === playerName[0]) {
      board[rowIndex][colIndex] = 'O';
      currentPlayer = playerName[1];
    } else {
      board[rowIndex][colIndex] = 'X';
      currentPlayer = playerName[0];
    }
    if (hasWinner(board)) {
      console.log('We have a winner');
      rl.close();
    }
    startGame();
  })
}

function setGame() {
  setName(1, () => {
    setName(2, startGame)
  })
}

setGame();
