let blocks = document.querySelectorAll(".block");
let gameArr = Array.from(blocks); //created an array with our selector
let restart_btn = document.querySelector("#re_btn"); //when the game is over, we created the button to restart the game
let next_player = document.querySelector("#announce"); //the area where we reflect the game result
let player = "X";

next_player.innerHTML = "X's choice";
let winPlayer = false;
let gameOver = false;

//combinations that can be won in the game
let comb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*After the game starts,
The result message will be displayed on the game screen 
with the results of the checkWin and check Tie functions*/
gameArr.forEach(function (elem) {
  elem.addEventListener("click", function () {
    if (elem.innerHTML != "") return;
    elem.innerHTML = player;

    checkWin();
    if (!winPlayer) {
      player = player == "X" ? "O" : "X";
      next_player.innerHTML = player + "'s choice";
    } else {
      next_player.innerHTML = `Game Over, ${player} is win`;
      blocks.forEach((block) => (block.style.pointerEvents = "none"));
    }

    checkTie();
  });
});

//The function where we match the player's choice and the combinations to be won
function checkWin() {
  comb.forEach(function (e) {
    let choice = e.every((index) => gameArr[index].innerHTML == player);
    if (choice) {
      winPlayer = true;
    }
  });
}

//in the player's selection, if the selections to win the game do not match,
//function where the game will end in a draw
function checkTie() {
  if (gameArr.every((e) => e.innerHTML !== "") && !winPlayer) {
    next_player.innerHTML = "Game Over, Tie";
  }
}

restart_btn.addEventListener("click", () => location.reload());