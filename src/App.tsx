import React from 'react';
import './App.scss';

const WIDTH = 11;
const HEIGHT = 10;

export function ChessBoard(props: {
    whiteColor: string,
    blackColor: string,
    side: "white" | "black"
 }) {
    const board = [];
    for (let i = 0; i < HEIGHT; i++) {
        const row = [];
        for (let j = 0; j < WIDTH; j++) {
            const isWhite = (i + j) % 2 === 0;
            const color = isWhite ? props.whiteColor : props.blackColor;
            row.push(
                <div
                    style={{
                        backgroundColor: color,
                        display: 'inline-block'
                    }}
                    className={`${isWhite ? "white" : "black"} square`}
                />
            );
        }
        board.push(<div key={i} style={{ display: 'flex' }}>{row}</div>);
    }
    return <div className="board">{props.side === 'white' ? board.reverse() : board}</div>;
};

function App() {
    return <ChessBoard whiteColor="#e1d3ff" blackColor="#725ac1" side="white" />;
}

export default App;
