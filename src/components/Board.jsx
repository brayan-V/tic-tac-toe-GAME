import { Square } from "./Square";
export const Board = ({resetGame, updateBoard, board}) =>{
    
    return(
        <>
        <h1>TIC TAC TOE( TRIKI )</h1>
                <button onClick={resetGame}>Reiniciar</button>
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
        </>
         
    )
}