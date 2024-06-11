import { useState } from "react";
import { HEIGHT, THEME, WIDTH } from "../consts";
// import { Piece } from "../../components/pieces/Pieces";
// import { coordsToKey } from "../../components/fen/Fen";
import "./Board.scss";
import React from "react";
// import { Piece } from "../pieces/Pieces";
import { Fen } from "../fen/Fen";

class Cell extends React.Component {
    type: "white" | "black" | "void";
    pos: { x: number, y: number };
    state: {
        piece: JSX.Element | null,
    };

    constructor(props: { piece?: JSX.Element, type?: "white" | "black", x: number, y: number }) {
        super(props);
        this.state = { piece: props.piece ? props.piece : null };
        this.type = props.type ? props.type : "void";
        this.pos = { x: props.x, y: props.y };
    }

    render() {
        return <div
            style={{
                backgroundColor: THEME[this.type],
                display: "inline-block"
            }}
            className={`${this.type} square`}
        >
            { this.state.piece }
        </div>;
    }
}

export class ChessBoard extends React.Component<{ side?: "white" | "black" }> {
    state: {
        rows: Cell[][];
        side: "white" | "black";
    };

    // constructor(props: { side: "white" | "black" | undefined }) {
    constructor(props: { side?: "white" | "black"; }) {
        super(props);
        const rows: Cell[][] = [];

        for (let i = 0; i < HEIGHT; i++) {
            const row: Cell[] = [];

            if (i === 1) row.push(new Cell({ type: "black", x: 0, y: i }));
            else         row.push(new Cell({                x: 0, y: i }));

            for (let j = 0; j < WIDTH; j++)
                row.push(new Cell({
                    type: (i + j) % 2 !== 0 ? "white" : "black",
                    x: j + 1,
                    y: i
                }));

            if (i === 8) row.push(new Cell({ type: "white", x: 11, y: i }))

            rows.push(row);
        }

        this.state = {
            rows: rows,
            side: props.side ? props.side : "white"
        };
    }

    componentDidMount() {
        this.setPieces();
    }

    setPieces() {
        const pieces = new Fen().decode();
        const cells: Cell[][] = this.state.rows;
        for (let i = 0; i < 10; i++)
            for (let j = 0; j < 11; j++)
                if (pieces[i][j]) cells[i][j + 1].state = { piece: pieces[i][j] };
        this.setState({ side: this.state.side, rows: cells });
    }

    render() {
        const rows = this.state.rows.map((row, i) => <div key={i} className="row">{
            row.map(cell => cell.render())
        }</div>);

        return <div className="board">{
            (this.state.side === "white") ? rows : rows.reverse()
        }</div>;
    }
}
