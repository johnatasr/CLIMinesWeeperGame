# Minesweeper Game

This is a simple command line interface (CLI) implementation of the classic Minesweeper game using TypeScript. This game has a board of 8x8 cells with 10 randomly placed mines. 

## How to Play

- Clone this repository to your local machine.
- Navigate to the root directory of the project in your terminal.
- Install dependencies by running `npm install`.
- Start the game by running `npm start`.
- Enter the row and column numbers separated by a comma (for example, "3,4") to reveal a cell.
- If the revealed cell is a mine, the game is over.
- Continue playing until you have revealed all the safe cells on the board.
- To end the game, type `exit`.

## Code Structure

### cli.ts

The `cli.ts` file exports a `MinesWeeperCLI` class that is responsible for reading user input and displaying the game board. The `start()` method initializes the game and starts the game loop. The `promptUser()` method displays the game board and prompts the user to enter the row and column numbers to reveal a cell. The `resetPrompt()` method is called when the user loses the game, and it displays the game board and prompts the user to play again or quit.

### main.ts

The `main.ts` file exports a `MinesWeeperCore` class that is responsible for initializing the game board and placing the mines. The `startGame()` method initializes the board and places the mines. The `initBoard()` method initializes the board by setting all cells to empty and randomly placing the mines. 
