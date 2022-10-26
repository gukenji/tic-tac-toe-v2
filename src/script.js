let gameboard = (function (){
  let gameboard = Array.from(Array(3), () => new Array(3));
  
  // DOM
  let cel = document.getElementsByTagName('td');
  let newGameButton = document.getElementById('newGame');
  let alerts = document.getElementById('alerts');
  //bind events
  newGameButton.addEventListener('click',newGame);

  for(i=0 ; i < cel.length; i++){
    cel[i].addEventListener('click',newMove);
  };

  function _render(){
    
  }

  function newMove(){
    let row = this.parentElement.rowIndex;
    let column = this.cellIndex;
    this.textContent = gameboard[row][column] ;
    console.log(gameboard);

  };

  function newGame(){
    _createPlayers();
    result = _drawPlayers();
    console.log(result) ;
   }

  function _createPlayers(){
    let playerOneName = document.getElementById('playerOneName').value;
    let playerOneStyle = document.getElementById('playerOneStyle').value;
    let playerTwoName = document.getElementById('playerTwoName').value;
    let playerTwoStyle = document.getElementById('playerTwoStyle').value;
    playerOne = player(playerOneName, playerOneStyle);
    playerTwo = player(playerTwoName, playerTwoStyle);
  }

  function _drawPlayers(){
    let result = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
    alerts.innerHTML = `O jogador ${result} irá começar!`
    return result;
  }

})();



// Player factory
const player = (name, display) => {
  return {name,display};
};

