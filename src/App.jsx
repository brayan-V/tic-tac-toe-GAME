import {useState } from "react";
import confetti from "canvas-confetti";

import { Board } from "./components/Board.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Turns } from "./components/Turns.jsx";
import { TURNS} from "./constants.js";
import { checkWinnerFrom, cheackEndGame } from "./logic/board.js";
import { saveGameToStorage, resetGameToStorage } from "./logic/storage/index.js";


function App() {
    // creamos el tablero
  const [board, setBoard] = useState(() =>{
    const boardFromStorage =  window.localStorage.getItem("board")
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  }
    
  );//estado inicial del tablero
// estado inicial del turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  })
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  // funcion para resetear el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameToStorage()
  }

  
  const updateBoard = (index) =>{
    // no actualizamos esta posicion si ya contiene algo
    if (board[index] || winner) return
    // actualizamos el estado del tablero
    const newBoard = [...board]; // newBoard contiene una copia del tablero
    newBoard[index] = turn; // actualizamos el estado del tablero en la posicion del index
    setBoard(newBoard); // enviamos el tablero actualizado
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);// turno actualizado
    // Guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //  revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (cheackEndGame(newBoard)){
      setWinner(false) // Empate
    }
  }

  return (
      <main className="board">
      <Board  board={board} updateBoard={updateBoard} resetGame={resetGame} />
      <Turns turn={turn} TURNS={TURNS} />
      <WinnerModal winner={winner}  resetGame={resetGame} />
      </main>
    );
  }

export default App;
