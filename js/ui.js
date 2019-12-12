const userInterface = {
    drawnOnce: false,
    $currentTileSelected: undefined, // a key that will be used to plot the tile the turn player has selected
    $tilesNotUsed: undefined, //will be defined once the game is going

    toggleUserInteraction: function ( computerHasMoved ){
        if ( computerHasMoved === false ){
            $(`td`).css(`pointerEvents`, `none`);
            $(`.userButton`).css(`pointerEvents`, `none`);
            $(`.aiMsg`).text(`Computer is making a move!`)
        }else{
            setTimeout(function(){
                $(`td`).css(`pointerEvents`, `all`);
                $(`.userButton`).css(`pointerEvents`, `all`);
                gameLogic.computerHasMoved = false;
                $(`.aiMsg`).text(``);
            },2000);
        };
    },

    winDrawMsg: function( turnplayer, drawCheck ){
        let msgOutput = ``;
        this.$userMsg.text(``);
        if (drawCheck){
            msgOutput = `This game is a draw!`;
        }else{
            msgOutput = `${turnplayer} is the winner!`;
        };
        this.$winOrDraw.text(msgOutput).animate({
            opacity: 0
        },4000, function(){
            userInterface.$winOrDraw.text(``).css(`opacity`, `1`);
        });
        $(`.restart`).click();
    },

    //increases the win counter for the appropriate player
    increaseTally: function ( winningPlayer, tallyValue ){
        $(`.${winningPlayer} p`).html(`${tallyValue}`);
    },

    turnMessage: function(turnPlayerSymbol, gameState, turnOver){
        if ( gameState === true && turnOver === false){
            this.$userMsg.text(`The ${turnPlayerSymbol} player still hasn't taken their turn!`);
        } else {
            this.$userMsg.text(`It is ${turnPlayerSymbol} player's turn!`);
        }
    },

    //clears the game board when called and turns off buttons until the loading message disappears
    clearBoard: function(){
        $(`.userButton`).off(`click`);
        $(`td`).html(``).removeClass(`blue red gridEffect used`).off(`click`);
        this.$userMsg.text(`RESTARTING! Please wait...`).animate({
            opacity: 0
        },4000, function(){
            userInterface.$userMsg.text(``).css(`opacity`, `1`);
            $(`.userButton`).on(`click`,function(){
                userInterface.checkButton($(this));
            });
            $(`td`).on(`click`, function(){
                userInterface.drawOrErase($(this));
            });
        });
        this.drawnOnce = false;
    },

    //Switches between UI button holders
    toggleHolders: function(buttonPressed){
        this.$buttonHolders.toggle();
        if ( buttonPressed.hasClass(`cross`) || buttonPressed.hasClass(`circle`)){
            this.$tilesNotUsed = $(`td:not(".used")`);
            this.$tilesNotUsed.addClass(`gridEffect`);
            if ( $(`#aiDropdown`).val() === `Player vs CPU`){
                gameLogic.computerEnabled = true;
            };
        }else if ( buttonPressed.hasClass(`restart`)){
            gameLogic.restartGame();
            this.clearBoard();
        };
    },
    
    //determines which UI button has been pressed
    checkButton: function(buttonPressed){
        if (buttonPressed.hasClass(`cross`)){
            const priority = `X`;
            gameLogic.gameStart(priority, `O`);
            this.toggleHolders(buttonPressed);
        }else if (buttonPressed.hasClass(`circle`)){
            const priority = `O`;
            gameLogic.gameStart(priority, `X`);
            this.toggleHolders(buttonPressed);
        }else if (buttonPressed.hasClass(`pass`)){
            if (this.$currentTileSelected !== undefined){
                this.$currentTileSelected.addClass(`used`);
            };//prevents the console from throwing errors when the board is fresh
            this.$tilesNotUsed = $(`td:not(".used")`);
            this.$tilesNotUsed.addClass(`gridEffect`);
            gameLogic.switchTurn();
            this.drawnOnce = false;
        }else{
            this.toggleHolders(buttonPressed);
        }   
    },

    //function checks whether or not the clicked tile is being used and draws according to whos turn it is or erases it if the tile was filled this turn
    fillGrid: function(gridContents, gridLocation){
        if (gridContents === ``){
            $(`td`).removeClass(`gridEffect`);
            this.drawnOnce = true;
            if (gameLogic.currentPlayerTurn === `X`){
                gridLocation.addClass(`blue`).html(`X`);// X tiles are always blue
            }else{
                gridLocation.addClass(`red`).html(`O`);// O tiles are always red
            }
        }else if (gridContents === gameLogic.currentPlayerTurn && gridLocation.hasClass(`used`) === false){
            gridLocation.removeClass(`blue red`).html(``);
            $(`td:not(".used")`).addClass(`gridEffect`);
            this.drawnOnce = false;
            gameLogic.turnCompleteToggle();
        };
    },

    //Ensures that the game is running before drawing on the board
    drawOrErase: function(gridLocation){
        if ( gridLocation.html() === `` && this.drawnOnce === false && gameLogic.gameOnGoing === true){
            this.fillGrid(gridLocation.html(), gridLocation);
            this.$currentTileSelected = gridLocation;
            gameLogic.turnCompleteToggle();
        }else if (gameLogic.gameOnGoing === true && gridLocation.html() !== ``) {
            this.fillGrid(gridLocation.html(), gridLocation);
            this.$currentTileSelected = undefined;
        };
    },
};

$(document).ready(function(){
    $(`.userButton`).on(`click`,function(){
        userInterface.checkButton($(this));
    });
    $(`td`).on(`click`, function(){
        userInterface.drawOrErase($(this));
    });
    userInterface.$buttonHolders = $(`.buttonHolder`);
    userInterface.$userMsg = $(`.userMessages`);
    userInterface.$winOrDraw = $(`.winOrDrawMsg`);
});