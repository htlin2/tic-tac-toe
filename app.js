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

function isInputValid(input) {
  if (input.length < 2) return false;
  if (input[0] < 0 || input[0] > 2) return false;
  if (input[1] < 0 || input[1] > 2) return false;
  return true;
}

function startGame() {
  console.table(board);
  rl.question(`'${currentPlayer}' enter row & column index: (row, col) > `, (input) => {
    if (!isInputValid(input)) {
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
