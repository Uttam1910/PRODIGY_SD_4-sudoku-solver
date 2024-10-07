# Sudoku Solver

![Sudoku Solver](https://img.shields.io/badge/Status-Complete-brightgreen.svg)
![Technologies](https://img.shields.io/badge/Technologies-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)

A **Sudoku Solver** web application that allows users to generate, solve, and interact with Sudoku puzzles directly in their browser. The application uses backtracking algorithm logic to solve any Sudoku puzzle and provides an intuitive user interface.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Contributing](#contributing)

## Features

- Generate pre-defined Sudoku puzzles with difficulty levels.
- Interactive Sudoku grid allowing users to input numbers.
- Automatic puzzle solving using a backtracking algorithm.
- Intuitive user interface with responsive design.
- Styled cells for better distinction between subgrids and interactive states.

## Demo

You can check out the live demo of the project here:  
[Sudoku Solver Live Demo](#) (Add the link once deployed)

## Technologies Used

This project is built using simple web technologies:

- **HTML**: For structuring the layout of the Sudoku grid.
- **CSS**: For styling the grid, making it visually appealing and responsive.
- **JavaScript**: For generating puzzles, solving Sudoku using a backtracking algorithm, and handling user interactions.

## Getting Started

To get started with the project, follow the instructions below:

### Prerequisites

- A modern web browser (Google Chrome, Firefox, Safari, Edge).
- Basic knowledge of HTML, CSS, and JavaScript is helpful but not required.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sudoku-solver.git

2. **Navigate to the project directory:**
   ```bash
   cd sudoku-solver

3. **Open the index.html file in your browser:**
   You can open it by simply double-clicking the index.html file or dragging it into your browser.

### **Usage**
   Choose a difficulty level from the dropdown.
   Click on Generate Sudoku to fill in a puzzle.
   Fill in the empty cells or click Solve Sudoku to see the solution.

### **How It Works**
**Sudoku Grid**
The 9x9 grid is dynamically generated using HTML and JavaScript. Each cell is an input field that allows users to enter numbers from 1-9.

**Puzzle Generation**
The "Generate Sudoku" button fills the grid with a pre-defined puzzle based on the selected difficulty level. You can extend the logic to load different puzzles for each difficulty level (easy, medium, hard).

**Solving Algorithm**
The solver uses a backtracking algorithm to recursively fill in numbers while checking for valid placements according to Sudoku rules. The solution is displayed in the grid upon completion.

**Styling**
CSS is used to style the grid and distinguish the 3x3 subgrids by adding thicker borders. Disabled cells (predefined numbers) have a different background color to differentiate them from user inputs.

**Responsive Design**
The layout is designed to be responsive, so the Sudoku solver works on both desktop and mobile devices.

### **Screenshots**
![image](https://github.com/user-attachments/assets/1e70b23c-69f4-4cb6-b010-a07a784c6a66)

### **Contributing**
Contributions, issues, and feature requests are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create your feature branch: git checkout -b feature/my-new-feature.
3. Commit your changes: git commit -m 'Add some feature'.
4 Push to the branch: git push origin feature/my-new-feature.
5. Submit a pull request.
