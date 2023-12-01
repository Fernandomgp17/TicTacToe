import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { TURNS } from "./components/Constants";
import checkWinner from "./logic/Board";
import WinnerModal from "./components/Winner";

function App() {
  
  const [board,setBoard] = useState(Array(9).fill(null));

  const [turn,setTurn] = useState(TURNS.X);

  const [winner,setWinner] = useState(null);

  const checkEndGame = (newBoard) => {
    return newBoard.every((square)=>square !== null);
  }

  const updateBoard = (index) => {

    if(board[index] || winner) return ;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    if(newWinner){
      setWinner(newWinner);
      confetti();
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  };

  const clickReset = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  return (

    <main className='board'>

      <h1>Tic Tac Toe</h1>

      <button onClick={clickReset} >Reset del juego</button>

      <section className="game">
        {
          board.map((square, index)=>{
           return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
            {square}
            </Square>
           )})
        }
      </section>

      <section className="turn">

        <Square isSelected = {turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn == TURNS.O}>{TURNS.O}</Square>

      </section>
      <WinnerModal clickReset={clickReset} winner={winner} />
    </main>

  )
}

export default App
