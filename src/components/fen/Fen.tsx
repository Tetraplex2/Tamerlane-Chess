import { Piece, pieceType } from "../pieces/Pieces";
import { DEFAULT_FEN } from "../consts";

export function coordsToKey(x: number, y: number): string {
    if (x < 1 || x > 11)
        if (y === 1)      return "cw";
        else if (y === 9) return "cb";
        else              return `q${y}`;
    else return `${"abcdefghijk".charAt(x)}${y}`;
}

// e1c1w1w1c1e/rnbgmkvgbnr/-r-n-b-g-m-k-v-e-c-w-p/11/11/11/11/-P-W-C-E-V-K-M-G-B-N-R/rnbgvkmgbnr/e1c1w1w1c1e w
export class Fen {
    static codes: { [name: string]: string } = {
        "e": "elephant",
        "m": "minister",
        "v":  "general",
        "g":  "giraffe",
        "b":   "bishop",
        "n":   "knight",
        "c":    "camel",
        "k":     "king",
        "w":     "mann",
        "r":     "rook"
    }

    isNumber(seq: string) {
        if (seq === "") return false;
        for (let c of seq)
            if (c < '0' || c > '9')
                return false;
        return true;
    }

    private splitFen(fen: string) {
        const res: string[] = [];
        let seq = "";

        for (let c of fen) {
            if (c   === '-') { seq  = c; continue; }
            if (seq === '-') { seq += c;           }
            if (c   === '/') { seq  = c;           }
            if (this.isNumber(c))
                if (this.isNumber(seq))  { seq += c; continue;      }
                else                     { seq  = c; continue;      }
            else if (this.isNumber(seq)) { res.push(seq); seq = ""; }
            if (seq === "")              { seq  = c;                }
            res.push(seq);
            seq = "";
        }

        return res;
    }

    private codeToPiece(token: string): JSX.Element | null {
        if (!token) return null;
        const isPawn = token.at(0) === '-';
        const side = token === token.toUpperCase() ? "white" : "black";
        const code = token.at(-1)!.toLowerCase();
        // return new Piece({ side: side, type: Fen.codes[code as keyof { [name: string]: string }] as pieceType, pawn: isPawn });
        return <Piece side={side} type={Fen.codes[code as keyof { [name: string]: string }] as pieceType} pawn={isPawn} />;
    }

    private initPieces(codesMap: string[][]) {
        const result = Array.from({ length: 10 }, () => new Array(11));
        for (let y = 0; y < 10; y++)
            for (let x = 0; x < 11; x++)
                result[y][x] = this.codeToPiece(codesMap[y][x]);
        return result;
    }

    public decode(fen: string = DEFAULT_FEN) {
        const result: string[][] = Array.from({ length: 10 }, () => new Array(11));

        let x: number = 0;
        let y: number = 0;
        for (let token of this.splitFen(fen)) {
            if (this.isNumber(token)) x += Number(token);
            else if (token === '/') { x = 0; y++; }
            else { result[y][x] = token; x++; }
        }
        return this.initPieces(result);
    }
}