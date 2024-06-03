import React from "react";
// import "./Pieces.scss";

export type pieceType = "elephant"
                      | "minister"
                      | "general"
                      | "giraffe"
                      | "viceroy"
                      | "bishop"
                      | "knight"
                      | "camel"
                      | "king"
                      | "mann"
                      | "rook";

export class Piece extends React.Component {
    side: "white" | "black";
    pawn: boolean;
    type: pieceType;

    constructor(props: {side: "white" | "black", type: pieceType, pawn: boolean } ) {
        super(props);
        this.side = props.side ? props.side : "white";
        this.pawn = props.pawn ? props.pawn : false;
        this.type = props.type ? props.type : "king";
    }

    render() {
        return <div
            className="piece"
            style={{
                backgroundImage: this.pawn
                    ? `url("pieces/${this.side}/pawns/${this.type}.png")`
                    : `url("pieces/${this.side}/masters/${this.type}.png")`,
                width: "50px",
                height: "50px",
                backgroundSize: "cover",
            }}
        ></div>;
    }
}
