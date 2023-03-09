export default class MinesWeeperCore {

    readonly ROWS: number = 8;
    readonly COLS: number = 8;
    readonly MINES: number = 10;

    private board: Array<Array<number | string | any>>;
    private fakeBoard: Array<Array<number | string | any>>;
    private mines: Array<Array<number>>;

    constructor() {
        /**
        * Constructs a new MineWeeperCore instance and starts a new game.
        */
        this.board = [];
        this.fakeBoard = [];
        this.mines = [];
        this.startGame();
    }

    public startGame(): void {
        /**
        * Starts a new game by initializing the board and placing the mines.
        */
        this.board = [];
        this.fakeBoard = [];
        this.mines = [];
        this.initBoard();
        this.populateMines();
    }

    private initBoard(): void {
        /**
        * Initializes the board by setting all cells to empty and randomly placing the mines.
        */
        for (var row = 0; row < this.ROWS; row++) {
            this.board[row] = [];
            this.fakeBoard[row] = [];
            for (var col = 0; col < this.COLS; col++) {
                this.board[row][col] = 0;
                this.fakeBoard[row][col] = "#";
            }
        }

        for (var i = 0; i < this.MINES; i++) {
            var row: number = Math.floor(Math.random() * this.ROWS);
            var col: number = Math.floor(Math.random() * this.COLS);
            if (this.board[row][col] !== "*") {
              this.board[row][col] = "*";
              this.mines.push([row, col]);
            } else {
              i--;
            }
        }
    }

    private populateMines(): void {
        /**
        * Populates the board with mine counts based on the mine locations.
        */
        for (var i = 0; i < this.mines.length; i++) {
            let row: number = this.mines[i][0];
            let col: number = this.mines[i][1];
            for (var r = Math.max(0, row - 1); r <= Math.min(row + 1, this.ROWS - 1); r++) {
              for (var c = Math.max(0, col - 1); c <= Math.min(col + 1, this.COLS - 1); c++) {
                if (this.board[r][c] !== "*") {
                  this.board[r][c]++;
                }
              }
            }
        }
    }

    public displayBoard(): void {
        /**
        * Displays the fake board with the player's guesses.
        */
        console.log("  " + [...Array(this.COLS).keys()].map(value => value + 1).join(" "));
        for (var row = 0; row < this.ROWS; row++) {
            console.log(row + 1 + " " + this.fakeBoard[row].join(" "));
        }
    }

    public revealCell(row: number, col: number): boolean{
        /**
        * Reveals the specified cell on the fake board and updates the board if necessary.
        */
        this.fakeBoard[row][col] = this.board[row][col];
        if (this.board[row][col] == "*") return false;         
        if (this.board[row][col] == "0") {
            for (var r = Math.max(0, row - 1); r <= Math.min(row + 1, this.ROWS - 1); r++) {
                for (var c = Math.max(0, col - 1); c <= Math.min(col + 1, this.COLS - 1); c++) {
                    if (this.board[r][c] == "1" || this.board[r][c] == "0") {
                        this.fakeBoard[r][c] = this.board[r][c];
                    }
                }
            }
        }
        return true;
    }

    public isInvalidRowCol(row: number, col: number): boolean {
        /**
        * Check if is invalid row and col
        */
        return (row > this.ROWS || row <= 0) && (col > this.COLS || col <= 0)
    }
}