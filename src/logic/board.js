import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
    // revisamos si hay alguna combinacion de 3 en la fila, columna o diagonal
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  // funcion para validar el fin del juego
  export   const cheackEndGame = (newBoard) =>{
    // revisamos si hay un empate, si no hay mas espacios vacios en el tablero
    return newBoard.every((square) => square != null)
  }