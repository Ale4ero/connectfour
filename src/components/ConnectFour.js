// import react library as React
import React from "react";
 
// import the Connect Four CSS 
import './ConnectFour.css'

// declare class ConnectFour so it extends class React.Componenet
class ConnectFour extends React.Component{     
    // declare the constructor receiving parameter props
    constructor(props)
    {
        // call method super() passing parameter props as an argument
        super(props)
        
        // initialize this.state object to include properties:
        // initialMatrix initialized to [[0, 0, 0, 0, 0, 0, 0],
        //                              [0, 0, 0, 0, 0, 0, 0],
        //                              [0, 0, 0, 0, 0, 0, 0],
        //                              [0, 0, 0, 0, 0, 0, 0],
        //                              [0, 0, 0, 0, 0, 0, 0],
        //                              [0, 0, 0, 0, 0, 0, 0]
        //                             ] 
        //
        // currentPlayer intialized to 1

        this.state = {
            initialMatrix: [[0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]],
            currentPlayer: 1
        };           
    }
    
    // define function fillbox, receives one parameter, e
    fillBox = (e) => {
        //console.log("fillBox");
        // Declare variable colValue set equal to function parseInt() of parameter e, object target, function getAttribute, passing as argument "data-value"
        const colValue = parseInt(e.target.getAttribute("data-value"));

        // Call function this.setPiece, passing arguments 5 (because we have 6 rows, 0 - 5) and variable colValue 
        this.setPiece(5, colValue);

        // Call method this.setState to update the state of property currentPlayer, if currently 1 then 2, if currently 2, then 1   
        this.setState(prevState => ({
            currentPlayer: prevState.currentPlayer === 1 ? 2 : 1
        }));     
    }   
    
    // define function setPiece, receives two parameters, startCount and colValue
    setPiece = (startCount, colValue) => {
        //console.log("setPiece");
        
        // declare variable initialMatrix intialized to state property initialMatrix
        const initialMatrix = [...this.state.initialMatrix];
        
        // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
        const rows = document.querySelectorAll(".grid-row");

        // write exception handling with try/catch to catch index out of bounds exception when array column is full 
        try {
            // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT identical to 0
            if (initialMatrix[startCount][colValue] !== 0) {
                // Decrement parameter startCount by 1
                startCount--;
                // Call function this.setPiece, passing as arguments parameters startCount and colValue
                this.setPiece(startCount, colValue);
            // Else
            } else {
                // Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
                const currentRow = rows[startCount].querySelectorAll(".grid-box");
                // Modify currentRow, index colValue, object classlist, method add, passing as arguments "filled" and player${`this.state.currentPlayer}` 
                currentRow[colValue].classList.add(`player${this.state.currentPlayer}`);
                // Update array initialMatrix, indexes startCount and colValue, set equal to this.state.currentPlayer
                initialMatrix[startCount][colValue] = this.state.currentPlayer;
                // If function call this.winCheck is true
                if (this.winCheck()) {
                    // Display an alert dialog box with message "Player " + this.state.currentPlayer + " wins!"
                    alert("Player " + this.state.currentPlayer + " wins!");
                    // return true
                    return true;
                }
            }

        // catch with parameter e
        } catch (e) {
            // Display an alert dialog box with message "Column full, select again"
            alert("Column full, select again");
        }

        // Call function this.gameOverCheck
        this.gameOverCheck();
    }    
    
    // Define function winCheck, no parameters
    winCheck = () =>{
    //console.log("winCheck");
        // Write decision making logic, if function call this.checkHorizontal, this.checkVertical, this.checkPositiveDiagonal, or this.checkNegativeDiagonal is true, return true
        // else return false
        return (
            this.checkHorizontal() ||
            this.checkVertical() ||
            this.checkPositiveDiagonal() ||
            this.checkNegativeDiagonal()
        );
    }
    
    // Define function checkHorizontal, no parameters
    checkHorizontal = () =>{
//console.log("checkHorizontal");

        // Write a nested for loop to iterate through the rows and columns
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                // if the currentPlayer has four discs in a row horizontally, return true
                if (
                    this.state.initialMatrix[i][j] === this.state.currentPlayer &&
                    this.state.initialMatrix[i][j + 1] === this.state.currentPlayer &&
                    this.state.initialMatrix[i][j + 2] === this.state.currentPlayer &&
                    this.state.initialMatrix[i][j + 3] === this.state.currentPlayer
                ) {
                    return true;
                }
            }
        }
        // return false
        return false;
    }

    // Define function checkVertical, no parameters
    checkVertical = () =>{
//console.log("checkVertical");

        // Write a nested for loop to iterate through the columns and rows
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 7; j++) {
                // if the currentPlayer has four discs in a row vertically, return true
                if (
                    this.state.initialMatrix[i][j] === this.state.currentPlayer &&
                    this.state.initialMatrix[i + 1][j] === this.state.currentPlayer &&
                    this.state.initialMatrix[i + 2][j] === this.state.currentPlayer &&
                    this.state.initialMatrix[i + 3][j] === this.state.currentPlayer
                ) {
                    return true;
                }
            }
        }
        // return false
        return false;
    }

    // Define function checkPositiveDiagonal, no parameters
    checkPositiveDiagonal = () =>{
//console.log("checkPositiveDiagonal");

        // Write a nested for loop to iterate through the rows and columns
        for (let i = 3; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                // if the currentPlayer has four discs in a row diagonally, bottom right to top left, return true
                if (
                    this.state.initialMatrix[i][j] === this.state.currentPlayer &&
                    this.state.initialMatrix[i - 1][j + 1] === this.state.currentPlayer &&
                    this.state.initialMatrix[i - 2][j + 2] === this.state.currentPlayer &&
                    this.state.initialMatrix[i - 3][j + 3] === this.state.currentPlayer
                ) {
                    return true;
                }
            }
        }
        // return false 
        return false;   
    }

    // Define function checkNegativeDiagonal, no parameters
    checkNegativeDiagonal = () =>{
//console.log("checkNegativeDiagonal");

        // Write a nested for loop to iterate through the rows and columns
        for (let i = 3; i < 6; i++) {
            for (let j = 3; j < 7; j++) {
                // If the currentPlayer has four discs in a row diagonally, bottom left to top right, return true
                if (
                    this.state.initialMatrix[i][j] === this.state.currentPlayer &&
                    this.state.initialMatrix[i - 1][j - 1] === this.state.currentPlayer &&
                    this.state.initialMatrix[i - 2][j - 2] === this.state.currentPlayer &&
                    this.state.initialMatrix[i - 3][j - 3] === this.state.currentPlayer
                ) {
                    return true;
                }
            }
        }
        // return false
        return false;
    }

    // define function gameOverCheck, no parameters
    gameOverCheck = () =>{
//console.log("gameOverCheck");
        // declare variable count intialized to 0
        let count = 0;
        // declare variable initialMatrix initialized to state property initialMatrix
        const initialMatrix = this.state.initialMatrix;

        // Iterate through the 2d array initialMatrix
        // Write a for/of loop to iterate through the rows, loop control variable innerArray, in 2d array initialMatrix
        for (let innerArray of initialMatrix) {
            // If object innerArray, function every(val => (val) != 0))
            if (innerArray.every(val => val !== 0)) {
                // increment variable count by 1
                count++;
            // Else
            }else{
                // return false
                return false
            }
        }        

        // If variable count is identical to 6
        if (count === 6) {
             // display alert dialog box that the game is over
             alert("The game is over.");
             // return true
             return true;
        }
    }    

    // *********************************************************** //
    // ATTENTION!!!! The // comments MUST be removed for the JSX   //
    //               to render correctly!!!!!                      //
    // *********************************************************** //

    //this is a new comment
    render(){

        return(

            <div className="wrapper">
                <div className="container">
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="1" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="2" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="3" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="4" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="5" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="6" onClick={(e) => this.fillBox(e)}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="1" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="2" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="3" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="4" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="5" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="6" onClick={(e) => this.fillBox(e)}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="1" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="2" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="3" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="4" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="5" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="6" onClick={(e) => this.fillBox(e)}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="1" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="2" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="3" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="4" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="5" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="6" onClick={(e) => this.fillBox(e)}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="1" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="2" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="3" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="4" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="5" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="6" onClick={(e) => this.fillBox(e)}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="1" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="2" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="3" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="4" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="5" onClick={(e) => this.fillBox(e)}></div>
                        <div className="grid-box" data-value="6" onClick={(e) => this.fillBox(e)}></div>
                    </div>
                </div>
                <div id="information">
                    <div className="player-wrappers">
                        Player 1
                        <div className="player1"></div>
                    </div>
                    <div className="player-wrappers">
                        Player 2
                        <div className="player2"></div>
                    </div>
                </div>
            </div>

       );
    }
}

// write the export default statement
export default ConnectFour;
