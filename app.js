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
  if (num1 === undefined || num1 < 0 || num1 > 2) return false;
  if (num2 === undefined || num2 < 0 || num2 > 2) return false;
  if (board[num1][num2] !== '') return false;
  return true;
}

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

  let dia = [board[0][0], board[1][1], board[2][2]];
  if (dia.every(e => e === 'O') || dia.every(e => e === 'X')) return true;
  dia = [board[0][2], board[1][1], board[2][0]];
  if (dia.every(e => e === 'O') || dia.every(e => e === 'X')) return true;

  return false;
}

function startGame() {
  console.table(board);

  if (hasWinner(board)) {
    console.log('We have a winner');
    return rl.close();
  }

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
    startGame();
  })
}

function setGame() {
  setName(1, () => {
    setName(2, startGame)
  })
}

setGame();
