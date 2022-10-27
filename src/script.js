let gameboard = (function (){
  let gameboard = Array.from(Array(3), () => new Array(3).fill(null));
  
  // DOM
  let cel = document.getElementsByTagName('td');
  let newGameButton = document.getElementById('newGame');
  let alerts = document.getElementById('alerts');
  //bind events
  newGameButton.addEventListener('click',newGame);


  function newGame(){
    alerts.className ="";
    if (_checkNames() && _checkStyles()) {
    _cleanBoard();
    _createPlayers();
    playerTurn = _drawPlayers(playerOne, playerTwo);
    _newMove();
  } else {
    _errorMessages();
  }
   };

   function _checkNames(){
    let playerOneNameLen = document.getElementById('playerOneName').textLength;
    let playerTwoNameLen = document.getElementById('playerTwoName').textLength;
    return (playerOneNameLen >0 && playerTwoNameLen > 0) ? true : false;
   }
  function _checkStyles(){
    let playerOneStyleLen = document.getElementById('playerOneStyle').textLength;
    let playerTwoStyleLen = document.getElementById('playerTwoStyle').textLength;
    let playerOne = document.getElementById('playerOneStyle').value;
    let playerTwo = document.getElementById('playerTwoStyle').value;
    return (playerOneStyleLen == 1 && playerTwoStyleLen ==1 && playerOne != playerTwo) ? true : false
  }

  function _errorMessages(){
    alerts.classList.add("red");
    _checkStyles() ? alerts.innerHTML = `Os jogadores precisam ter nomes!` : 
                    alerts.innerHTML = `O estilo do jogador só pode ter 1 caracter e devem ser diferentes!`;
  }

  function _cleanBoard(){
    gameboard = Array.from(Array(3), () => new Array(3).fill(null));
    for(i=0 ; i < cel.length; i++){
      cel[i].textContent = "";
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

  function _newMove(){
    for(i=0 ; i < cel.length; i++){
      cel[i].addEventListener('click', _render);
    }
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
    alerts.innerHTML = `Turno do jogador ${playerTurn.name}!`

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
    diag1 = [];
    diag2 =[];
    for (i=0 ; i<=2; i++){
      diag1.push(gameboard[i][i]);
      diag2.push(gameboard[2-i][i]);
    }
    diag1 = (diag1.every( e => (e == playerTwo.display)) || diag1.every( e => (e == playerOne.display)));
    diag2 = (diag2.every( e => (e == playerTwo.display)) || diag2.every( e => (e == playerOne.display)));
    diags = (diag1 || diag2)

    //Checagem
    if (lines == true || columns == true || diags == true){
      alerts.classList.add("green");
      winner = playerTurn.name
      alerts.innerHTML = `O jogador ${winner} ganhou!`
      playerTurn = null;
    } else if(gameboard[0].every (e => e != null) && gameboard[1].every (e => e != null) && gameboard[2].every (e => e != null)) {
      alerts.innerHTML = `Empatou!`
      playerTurn = null;
    }
     else {
      _changePlayerTurn();
    }
  }
})();

// Player factory
const player = (name, display) => {
  return {name,display};
};

