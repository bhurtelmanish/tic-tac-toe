const tic_tac_toe = document.querySelectorAll('.game-container')[0];
tic_tac_toe.style.display = 'none';

const new_game_btn = document.querySelectorAll('.new-game-btn')[0];

const loader = document.querySelectorAll('.loader')[0];
loader.style.display = 'none';

const game_desc = document.querySelectorAll('.desc')[0];

const winnerPopUpMenu = document.querySelectorAll('.winner-showcase')[0];
const winnerDisplay = document.querySelectorAll('.winner-display')[0];
winnerPopUpMenu.style.display = 'none';

const gameButton = document.querySelectorAll('.game-btn');

const playAgainButton = document.querySelectorAll('.play-again-btn')[0];

const resetGameButton = document.querySelectorAll('.game-condition-btn')[0];

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let initialButtonValue = `O`;

let clickCount = 0;

let loading = false;

new_game_btn.addEventListener('click', () =>{
    loading = true;
    (loading == true) ? loader.style.display = 'block' : loader.style.display = 'none'

    new_game_btn.style.display = 'none';
    game_desc.style.display = 'none';

    setTimeout(()=>{
         tic_tac_toe.style.display = 'block';
         loading = false;
         (loading == false) ? loader.style.display = 'none' : loader.style.display = 'block'
    } , 100);
})


gameButton.forEach((button)=>{
    button.addEventListener('click', () => {
        clickCount = clickCount + 1;
        button.innerText = initialButtonValue;
        if(clickCount%2 == 0) {
            button.innerText = `X`;
        }else{
            button.innerText = `O`;
        }
        button.disabled = true;

        checkWinner(button);
    })
})

const checkWinner = (button) => {
    let currentPlayerSymbol = button.innerText;
    winningPatterns.forEach((pattern) => {
        const [a , b , c] = pattern;
        const buttonA = gameButton[a];
        const buttonB = gameButton[b];
        const buttonC = gameButton[c];

        if(buttonA.innerText == currentPlayerSymbol && buttonB.innerText == currentPlayerSymbol && buttonC.innerText == currentPlayerSymbol){
            winnerDisplay.innerText = `Congratulations!! The winner is ${currentPlayerSymbol}`
            setTimeout(()=>{
                if(winnerPopUpMenu.style.display = "none"){
                    winnerPopUpMenu.style.display = "flex";
                }else{
                    winnerPopUpMenu.style.display = "none";
                }
            } , 200)
            tic_tac_toe.style.display = 'none';

            resetGame();

            playAgainButton.addEventListener("click", ()=>{
                playAgain();
            });
        }

        checkDraw();
    })
}

const checkDraw = () => {
    // Check if all buttons have been clicked
    const allButtonsClicked = [...gameButton].every(button => button.innerText !== '');

    // If all buttons are clicked and there is no winner, it's a draw
    if (allButtonsClicked) {
        winnerDisplay.innerText = "It's a draw!";
        // Show the winner pop-up menu
        winnerPopUpMenu.style.display = "flex";
        tic_tac_toe.style.display = 'none';
       
        playAgainButton.addEventListener("click", ()=>{
            playAgain();
        });
         // Reset the game
        resetGame();
    }
};


const playAgain = () => {
    tic_tac_toe.style.display = 'flex';
    if(winnerPopUpMenu.style.display = "flex"){
        winnerPopUpMenu.style.display = "none";
    }else{
        winnerPopUpMenu.style.display = "flex";
    }
    winnerDisplay.innerText = ``;
}


const resetGame = () => {
    gameButton.forEach((button)=>{
        button.innerText = '';
        button.disabled = false;
    })
    initialButtonValue = `O`;
    clickCount = 0;
}

resetGameButton.addEventListener('click' , resetGame);
