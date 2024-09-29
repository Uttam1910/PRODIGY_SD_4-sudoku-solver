// Create a 9x9 grid dynamically
function createGrid() {
  const table = document.getElementById("sudoku-grid");
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = 9;
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
  rows.forEach((row, rowIndex) => {
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

// Check if the number can be placed at board[row][col]
function isValid(board, row, col, num) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}

// Solve the Sudoku using backtracking
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
};
