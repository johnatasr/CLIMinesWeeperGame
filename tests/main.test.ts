import MinesWeeperCore from "../app/main";

describe("MinesWeeperCore", () => {
    let mineWeeperCore: MinesWeeperCore;

    beforeEach(() => {
       mineWeeperCore = new MinesWeeperCore();
    });

    it("should create a new instance of MineWeeperCore", () => {
        expect(mineWeeperCore).toBeInstanceOf(MinesWeeperCore);
    });

    it("should initialize the board and place the mines on startGame", () => {
        mineWeeperCore.startGame();

        let mineCount = 0;
        for (let row = 0; row < mineWeeperCore.ROWS; row++) {
            for (let col = 0; col < mineWeeperCore.COLS; col++) {
                if (mineWeeperCore.board[row][col] === "*") {
                    mineCount++;
                }
            }
        }

        expect(mineCount).toBe(mineWeeperCore.MINES);
    });

    it("should reveal the cell and update the fakeBoard if necessary", () => {
        mineWeeperCore.startGame();

        const row = 0;
        const col = 0;
        const expectedValue = mineWeeperCore.board[row][col];
        const returnValue = mineWeeperCore.revealCell(row, col);

        expect(returnValue).toBeTruthy();
        expect(mineWeeperCore.fakeBoard[row][col]).toBe(expectedValue);
    });

    it("should return true if the row or col are invalid", () => {
        const invalidRow = -1;
        const invalidCol = 10;

        const returnValue = mineWeeperCore.isInvalidRowCol(invalidRow, invalidCol);

        expect(returnValue).toBeTruthy();
    });
});