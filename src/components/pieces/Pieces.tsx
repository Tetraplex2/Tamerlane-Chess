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

export class Piece {
    side: "white" | "black";
    pawn: boolean;
    type: pieceType;

    constructor(side: "white" | "black", type: pieceType, pawn: boolean = false) {
        this.side = side;
        this.pawn = pawn;
        this.type = type;
    }

    render() {
        return <div className="piece" img-src={this.pawn ? `pieces/${this.side}/pawns/${this.type}` : `pieces/${this.side}/masters/${this.type}`}></div>
    }
}
