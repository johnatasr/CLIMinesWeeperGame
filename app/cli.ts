import * as readline from 'readline';
import Mineboard from '../app/main'

class MineBoardCLI {
  private rl: readline.Interface;
  private game: Mineboard;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.game = new Mineboard();
  }

  private resetPrompt(): void {
    console.log("Boom !!! You lost :(");
    this.game.displayBoard();
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
    this.game.displayBoard()
    this.rl.question('Enter a row and colunm number to discover, example "3, 4": ', (answer: string) => {      
      console.log("");
      if (answer.toLowerCase() === 'exit') {
        this.rl.close();
      } else {
        const splitedValues: Array<string> = answer.split(",");
        const row: number = parseInt(splitedValues[0], 10);
        const col: number = parseInt(splitedValues[1], 10);
        if (isNaN(row) || isNaN(col) || this.game.isInvalidRowCol(row, col)) {
          console.log('Invalid input. Please enter a number a valid answer to row and col. For example "5, 7"');
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

  public start(): void {
    console.log("Initializing game ...");
    console.log(" --------------- MINESWEEPER ----------------- ")
    console.log("Type 'exit' to end the game");
    this.promptUser();
  }
}

const cli = new MineBoardCLI();
cli.start();