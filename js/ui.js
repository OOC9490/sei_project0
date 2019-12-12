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
            this.$drawSound.play();
        }else{
            msgOutput = `${turnplayer} is the winner!`;
            this.$winSound.play();
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
            gameLogic.restartGame();
        });
        this.drawnOnce = false;
    },

    //Switches between UI button holders
    toggleHolders: function(buttonPressed){
        this.$buttonHolders.toggle();
        if ( buttonPressed.hasClass(`cross`) || buttonPressed.hasClass(`circle`)){
            this.$tilesNotUsed = $(`td:not(".used")`);
            this.$tilesNotUsed.addClass(`gridEffect`);
        }else if ( buttonPressed.hasClass(`restart`)){
            this.clearBoard();
        };
    },
    
    //determines which UI button has been pressed
    checkButton: function(buttonPressed){
        if (buttonPressed.hasClass(`cross`)){
            const priority = `X`;
            this.toggleHolders(buttonPressed);
            gameLogic.gameStart(priority, `O`);
        }else if (buttonPressed.hasClass(`circle`)){
            const priority = `O`;
            this.toggleHolders(buttonPressed);
            gameLogic.gameStart(priority, `X`);
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
            $(`td`).removeClass(`gridEffect`); //removes the hover css from tiles to help indicate you cant interact with the grid anymore
            this.drawnOnce = true;
            if (gameLogic.currentPlayerTurn === `X`){
                gridLocation.addClass(`blue`).html(`X`);// X tiles are always blue
            }else{
                gridLocation.addClass(`red`).html(`O`);// O tiles are always red
            }
            this.$placeTokenSound.play();
        }else if (gridContents === gameLogic.currentPlayerTurn && gridLocation.hasClass(`used`) === false){
            gridLocation.removeClass(`blue red`).html(``);
            this.$removeTokenSound.play();
            $(`td:not(".used")`).addClass(`gridEffect`);
            this.drawnOnce = false;
            gameLogic.turnCompleteToggle();
            this.turnMessage(gameLogic.currentPlayerTurn, gameLogic.gameOnGoing, true);
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
        }else if (gameLogic.gameOnGoing){
            this.$userMsg.text(`You've already placed a token!`);
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
    userInterface.$placeTokenSound = $(`.eventSounds`)[0];
    userInterface.$removeTokenSound = $(`.eventSounds`)[1];
    userInterface.$winSound = $(`.eventSounds`)[2];
    userInterface.$drawSound = $(`.eventSounds`)[3];

});