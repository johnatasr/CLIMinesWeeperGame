import * as readline from 'readline';
import MinesWeeperCore from '../app/main';

export default class MinesWeeperCLI {
  private rl: readline.Interface;
  private game: MinesWeeperCore;

  constructor() {
    /**
     * Creates an interface for readline module to read input from stdin and output to stdout.
     */
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    // Creates a new Mineboard instance.
    this.game = new MinesWeeperCore();
  }

  private getHeader(): void{
    /**
     * Prints the header for the game.
     */
    console.log(" ---------------------------------------------------- ");
    console.log(" ---------------CLI MINESWEEPER GAME----------------- ");
    console.log(" ---------------------------------------------------- ");
  }

  private resetPrompt(): void {
    /**
     * Prints the game board and prompts the user to play again or quit.
     * If the user chooses to play again, the game is restarted.
     */
    console.log("Boom !!! You lost :(");
    this.putLines(2);
    this.game.displayBoard();
    this.putLines(2);
    this.rl.question('Do you like to try again ? Y/n:  ', (answer: string) => {      
      if (answer.toLowerCase() === 'n') {
        this.rl.close();
      } else {
        this.game.startGame();
        this.promptUser();
      }
    });
  }

  private promptUser(): void {
    /**
     * Prints the game board and prompts the user to enter the row and column numbers to reveal a cell.
     * If the user enters 'exit', the game ends.
     * If the user enters an invalid row or column number, an error message is displayed.
     * If the user loses the game, the resetPrompt() method is called.
     */
    this.game.displayBoard();
    this.putLines(2);
    this.rl.question('Enter a row and colunm number to discover, example "3, 4": ', (answer: string) => {      
      this.putLines(2);
      if (answer.toLowerCase() === 'exit') {
        this.rl.close();
      } else {
        const splitedValues: Array<string> = answer.split(",");
        const row: number = parseInt(splitedValues[0], 10);
        const col: number = parseInt(splitedValues[1], 10);
        if (isNaN(row) || isNaN(col) || this.game.isInvalidRowCol(row, col)) {
          console.log('Invalid input. Please enter a number a valid answer to row and col. For example "5, 7"');
          this.putLines(2);
        } else {
          const result: boolean = this.game.revealCell(row - 1 , col - 1);
          
          if (!result) {
            this.resetPrompt();
            return
          }
        }
        this.promptUser();
      }
    });
  }

  private putLines(lines: number): void {
    /**
     * Prints empty lines.
     * 
     * @param lines The number of lines to print.
     */
    for (let i = 0; i < lines; i++) {
      console.log(' ');
      i++;
    } 
  }

  public start(): void {
    /**
     * Initializes the game and starts the game loop.
     */
    console.log("Initializing game ...");
    this.putLines(4);
    this.getHeader();
    this.putLines(3);
    console.log("To play it is very simple just put the line number separated with a comma with the column number")
    console.log("Type 'exit' to end the game");
    this.putLines(2);
    this.promptUser();
  }
}

// Creates a new MinesWeeperCLI instance and starts the game.
const cli = new MinesWeeperCLI();
cli.start();
