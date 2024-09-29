// Create a 9x9 grid dynamically
function createGrid() {
  const table = document.getElementById("sudoku-grid");
  table.innerHTML = ""; // Clear previous grid
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = 9;
      input.classList.add("sudoku-cell");
      td.appendChild(input);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

// Retrieve the current grid values from the table
function getBoard() {
  const board = [];
  const rows = document.querySelectorAll("#sudoku-grid tr");
  rows.forEach((row) => {
    const currentRow = [];
    const cells = row.querySelectorAll("td input");
    cells.forEach((cell) => {
      const value = cell.value;
      currentRow.push(value ? parseInt(value) : 0); // 0 for empty cells
    });
    board.push(currentRow);
  });
  return board;
}

// Set the values in the grid after solving
function setBoard(board) {
  const rows = document.querySelectorAll("#sudoku-grid tr");
  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll("td input");
    cells.forEach((cell, colIndex) => {
      cell.value = board[rowIndex][colIndex] === 0 ? "" : board[rowIndex][colIndex];
    });
  });
}

// Validate number placement
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false; // Check row
    if (board[i][col] === num) return false; // Check column
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false; // Check 3x3 subgrid
    }
  }
  return true;
}

// Solve Sudoku using backtracking
function solveSudokuHelper(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudokuHelper(board)) {
              return true;
            }
            board[row][col] = 0; // Backtrack
          }
        }
        return false; // No solution found
      }
    }
  }
  return true; // Solved
}

// Solve button handler
function solveSudoku() {
  const board = getBoard();
  if (solveSudokuHelper(board)) {
    setBoard(board);
    alert("Sudoku Solved!");
  } else {
    alert("No solution exists for this Sudoku.");
  }
}

// Clear button handler
function clearGrid() {
  const inputs = document.querySelectorAll("#sudoku-grid td input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

// Initialize the grid on page load
window.onload = function () {
  createGrid();
  startTimer(); // Start timer on page load
};

// Timer function
let timer;
let startTime;

function startTimer() {
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const now = Date.now();
  const elapsed = Math.floor((now - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  document.getElementById("time").innerText = `${minutes}:${seconds}`;
}

// Generate a full Sudoku board
function generateFullBoard() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
}

// Fill the Sudoku board using backtracking
function fillBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffleArray([...Array(9).keys()].map(n => n + 1)); // Randomize numbers
        for (const num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0; // Backtrack
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Remove numbers to create a puzzle based on difficulty level
function removeNumbers(board, difficulty) {
  let cellsToRemove;
  switch (difficulty) {
    case "easy":
      cellsToRemove = 40; // Easy: remove 40 cells
      break;
    case "medium":
      cellsToRemove = 50; // Medium: remove 50 cells
      break;
    case "hard":
      cellsToRemove = 60; // Hard: remove 60 cells
      break;
    default:
      cellsToRemove = 40;
  }

  const cellsRemoved = new Set();
  while (cellsRemoved.size < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    cellsRemoved.add(`${row}-${col}`); // Store cell position to ensure uniqueness
    board[row][col] = 0; // Remove number
  }
}

// Generate puzzle based on selected difficulty
function generatePuzzle() {
  const difficulty = document.getElementById("difficulty").value;
  const fullBoard = generateFullBoard();
  removeNumbers(fullBoard, difficulty);
  setBoard(fullBoard);
}

// Hint functionality
function giveHint() {
  const board = getBoard();
  const hintPosition = findEmptyCell(board);
  if (hintPosition) {
    const [row, col] = hintPosition;
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        alert(`Hint: You can place ${num} in cell (${row + 1}, ${col + 1})`);
        return;
      }
    }
    alert("No hints available for this cell.");
  } else {
    alert("No empty cells available.");
  }
}

// Find the first empty cell
function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col]; // Return coordinates of the first empty cell
      }
    }
  }
  return null; // No empty cells
}
