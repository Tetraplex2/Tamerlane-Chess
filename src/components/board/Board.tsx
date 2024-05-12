import { HEIGHT, THEME, WIDTH } from "../consts";
import "./Board.scss";

function Cell(props: { type: "white" | "black" | "void" }) {
    return <div
        style={{
            backgroundColor: THEME[props.type],
            display: "inline-block"
        }}
        className={`${props.type} square`}
    />
}

export function ChessBoard(props: { side: "white" | "black" }) {
    let board = [];
    for (let i = 0; i < HEIGHT; i++) {
        const row = [];

        if (i === 1) row.push(<Cell type="black" />);
        else         row.push(<Cell type="void"  />);

        for (let j = 0; j < WIDTH; j++)
            row.push(<Cell type={(i + j) % 2 !== 0 ? "white" : "black"} />);

        if (i === 8) row.push(<Cell type="white" />);

        // board.push(<div key={i} style={{ display: "flex" }}>{row}</div>);
        board.push(row);
    }
    board = board.map((row, i) => <div key={i} className="row">{row}</div>);
    return <div className={"board"}>{props.side === "white" ? board : board.reverse()}</div>;
};