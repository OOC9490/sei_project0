const gameLogic = {
    gameOnGoing: false,
    turnComplete: true,
    isDraw: false,
    playerOneSymbol: ``,
    playerTwoSymbol: ``,
    currentPlayerTurn: ``,
    xWins: 0,
    oWins: 0,
    tilesFilled: 0,
    winningCombos: [
        "#one.colour, #two.colour, #three.colour",
        "#four.colour, #five.colour, #six.colour",
        "#seven.colour, #eight.colour, #nine.colour",
        "#one.colour, #four.colour, #seven.colour",
        "#two.colour, #five.colour, #eight.colour",
        "#three.colour, #six.colour, #nine.colour",
        "#one.colour, #five.colour, #nine.colour",
        "#seven.colour, #five.colour, #three.colour"
    ],//winning combos are found based on finding elements with a matching id and class arranged in a manner specified above 
    
    //maps the current board state against the known winning combos
    findWinningCombo: function(winConArray, colour) {
        return winConArray.map(function(winCon) {
          let winConChecker = winCon.replace(/colour/g, colour);
          return winConChecker = $(winConChecker).length === 3;
        })
    },

    winOrDraw: function (){
        const blueGameState = this.findWinningCombo(this.winningCombos, `blue`);
        const redGameState = this.findWinningCombo(this.winningCombos, `red`);
        const blueWinner = blueGameState.includes(true);
        const redWinner = redGameState.includes(true);
        let tallyUpdate = 0;
        if ( blueWinner || redWinner ){
            if ( blueWinner === true){
                this.xWins++;
                tallyUpdate = this.xWins;
            }else{
                this.oWins++;
                tallyUpdate = this.oWins;
            };
            this.gameOnGoing = false; //stops the user from interacting with the board
            userInterface.increaseTally(this.currentPlayerTurn, tallyUpdate);
            userInterface.winDrawMsg(this.currentPlayerTurn, this.isDraw);
            return;
        }; //determines whether or not there is a winner
        if (this.tilesFilled === 9 && this.gameOnGoing === true){
            this.gameOnGoing = false; //same as above
            this.isDraw = true;
            userInterface.winDrawMsg(this.currentPlayerTurn, this.isDraw);
            return;
        }; //determines whether or not there is a draw
        if (this.currentPlayerTurn === this.playerOneSymbol){
            this.currentPlayerTurn = this.playerTwoSymbol;
        }else{
            this.currentPlayerTurn = this.playerOneSymbol;
        };
        userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        this.turnCompleteToggle();
    },

    turnCompleteToggle: function (){
        if ( this.turnComplete === false ){
            this.turnComplete = true;
        }else{
            this.turnComplete = false;
        };
    },

    restartGame: function (){
        this.gameOnGoing = false;
        this.turnComplete = true;
        this.isDraw = false;
        this.tilesFilled = 0;
        this.playerOneSymbol = ``;
        this.playerTwoSymbol = ``;
    },

    switchTurn: function(){
        if ( this.turnComplete ){
            this.tilesFilled++;
            this.winOrDraw();
        }else{
            userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        };
    },

    gameStart: function (firstPlayer, secondPlayer) {
        this.playerOneSymbol = firstPlayer;
        this.playerTwoSymbol = secondPlayer;
        this.currentPlayerTurn = firstPlayer;
        userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        this.gameOnGoing = true;
        this.turnComplete = false;
    },
};