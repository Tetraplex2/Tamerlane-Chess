import React from 'react';
import './App.css';

export function ChessBoard(
    width: number,
    height: number,
    whiteColor: string,
    blackColor: string,
    side: "white" | "black"
 ) {
    const board = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const isWhite = (i + j) % 2 === 0;
            const color = isWhite ? whiteColor : blackColor;
            row.push(
                <div
                    style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: color,
                        display: 'inline-block'
                    }}
                />
            );
        }
        board.push(<div key={i} style={{ display: 'flex' }}>{row}</div>);
    }
    return <div>{side === 'white' ? board.reverse() : board}</div>;
};

function App() {
    return ChessBoard(4, 5, "#fff", "#000", "white");
}

export default App;
