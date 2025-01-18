import {useState } from "react";

// declaramos nuestros turnos
const TURNS = {
  X: "x",
  O: "o",
};



const Square = ({ children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () =>{
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function App() {
    // creamos el tablero
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );//estado inicial del tablero
// estado inicial del turno
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
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
  const updateBoard = (index) =>{
    // no actualizamos esta posicion si ya contiene algo
    if (board[index] || winner) return
    // actualizamos el estado del tablero
    const newBoard = [...board]; // newBoard contiene una copia del tablero
    newBoard[index] = turn; // actualizamos el estado del tablero en la posicion del index
    setBoard(newBoard); // enviamos el tablero actualizado
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);// turno actualizado
    //  revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
    }
  }

  return (
      <main className="board">
        <h1>TIC TAC TOE( TRIKI )</h1>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
      </main>
    );
  }

export default App;
