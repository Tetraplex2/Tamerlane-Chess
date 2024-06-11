import React from "react";
import useState from "react";
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

export class Piece extends React.Component<{side: "white" | "black", type: pieceType, pawn: boolean }> {
    side: "white" | "black";
    pawn: boolean;
    type: pieceType;
    state: {
        hover: boolean,
        drag: boolean,
        offsetX: number,
        offsetY: number,
    };
    mounted: boolean;

    constructor(props: {side: "white" | "black", type: pieceType, pawn: boolean } ) {
        super(props);
        this.side = props.side ? props.side : "white";
        this.pawn = props.pawn ? props.pawn : false;
        this.type = props.type ? props.type : "king";
        this.state = { hover: false, drag: false, offsetX: 0, offsetY: 0 };
        this.mounted = false;

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseMove  = this.mouseMove.bind(this);
        this.mouseDown  = this.mouseDown.bind(this);
        this.mouseUp    = this.mouseUp.bind(this);
    }

    componentDidUpdate() {
        console.log("Updated ", this.type)
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseMove  = this.mouseMove.bind(this);
        this.mouseDown  = this.mouseDown.bind(this);
        this.mouseUp    = this.mouseUp.bind(this);
        // this.mounted    = true;
    }

    mouseEnter = (_event: object) => {
        console.log("Mouse enter", this.type);
        // if (this.mounted) {}
        this.setState({ hover: true, drag: false, offsetX: 10, offsetY: 0 }, () => {
            console.log("state set", this.state);
        });
    }

    mouseMove(_event: object) {
        console.log("Mouse move", _event);
    }

    mouseLeave(_event: object) {
        console.log("Mouse leave");
        this.setState({ hover: false, drag: false, offsetX: 0, offsetY: 0 });
    }

    mouseDown(_event: object) {
        console.log("Mouse down");
        this.setState({ hover: true, drag: true, offsetX: 0, offsetY: 0 });
    }

    mouseUp(_event: object) {
        console.log("Mouse up");
        this.setState({ hover: this.state.hover, drag: false, offsetX: 0, offsetY: 0 })
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
                transform: `translate(${this.state.offsetX}px, ${this.state.offsetY}px)`,
            }}
            onMouseEnter={e => this.mouseEnter(e)}
            onMouseLeave={e => this.mouseLeave(e)}
            // onMouseMove={e => this.mouseMove(e)}
            onMouseDown={e => this.mouseDown(e)}
            onMouseUp={e => this.mouseUp(e)}
        ></div>;
    }
}
