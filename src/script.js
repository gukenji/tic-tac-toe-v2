let gameboard = (function (){
  let gameboard = Array.from(Array(3), () => new Array(3).fill(null));
  
  // DOM
  let cel = document.getElementsByTagName('td');
  let newGameButton = document.getElementById('newGame');
  let alerts = document.getElementById('alerts');
  //bind events
  newGameButton.addEventListener('click',newGame);


  function newGame(){
    _createPlayers();
    playerTurn = _drawPlayers(playerOne, playerTwo);
    _newMove();
   };
  
   function _newMove(){
    for(i=0 ; i < cel.length; i++){
      cel[i].addEventListener('click', _render);
    }
   }

  function _createPlayers(){
    let playerOneName = document.getElementById('playerOneName').value;
    let playerOneStyle = document.getElementById('playerOneStyle').value;
    let playerTwoName = document.getElementById('playerTwoName').value;
    let playerTwoStyle = document.getElementById('playerTwoStyle').value;
    playerOne = player(playerOneName, playerOneStyle);
    playerTwo = player(playerTwoName, playerTwoStyle);
  }

  function _drawPlayers(playerOne, playerTwo){
    let result = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
    alerts.innerHTML = `O jogador ${result} irá começar!`
    return result == 1 ? playerOne : playerTwo;
  }

  function _render(){
    let row = this.parentElement.rowIndex;
    let column = this.cellIndex;
    gameboard[row][column] = playerTurn.display;
    this.textContent = playerTurn.display ;
    _isEndGame();
    
  };

  function _changePlayerTurn(){
    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
  }

  function _isEndGame(){
    // Horizontal
    line1 = (gameboard[0].every( e => (e == playerTwo.display)) || gameboard[0].every( e => (e == playerOne.display)));
    line2 = (gameboard[1].every( e => (e == playerTwo.display)) || gameboard[1].every( e => (e == playerOne.display)));
    line3 = (gameboard[2].every( e => (e == playerTwo.display)) || gameboard[2].every( e => (e == playerOne.display)));
    lines = (line1 || line2 || line3);
    // Vertical
    columns = false;
    for (i=0 ; i <=2; i++){
      column = [];
      for(j=0 ; j<=2 ; j++){
        column.push(gameboard[j][i]);
      }
      columns = (column.every( e => (e == playerTwo.display)) || column.every( e => (e == playerOne.display)));
      if (columns == true) break;
    };
    // Diagonal
 
    //Checagem
    if (lines == true || columns == true ){
      winner = playerTurn.name
      alerts.innerHTML = `O jogador ${winner} ganhou!`
      playerTurn = null;
    } else {
      _changePlayerTurn();
    }
  }
})();

// Player factory
const player = (name, display) => {
  return {name,display};
};

