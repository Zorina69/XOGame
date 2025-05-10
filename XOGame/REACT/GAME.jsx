// GAME.jsx
const { useState } = React;

export default function Game() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };
    

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const status = winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`;

    const resetGame = () => setBoard(Array(9).fill(null));

    return (
        <div className="game">
            <h2>{status}</h2>
            <div className="board">
                {board.map((value, index) => (
                    <button className="square" key={index} onClick={() => handleClick(index)}>
                        {value}
                    </button>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset Game</button>
        </div>
    );
}