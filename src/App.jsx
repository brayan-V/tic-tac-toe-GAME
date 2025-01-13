// declaramos nuestros turnos
const TURNS = {
  X: "x",
  O: "o",
};

// creamos el tablero
const board = Array(9).fill(null);

function App() {
  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <div className="cell" key={index}>
              <span className="cell_content">{index}</span>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
