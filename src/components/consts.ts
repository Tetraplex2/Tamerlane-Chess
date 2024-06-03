import { ChessBoard } from "./board/Board";

export const WIDTH = 11;
export const HEIGHT = 10;
export const THEME = {
    "white": "#e1d3ff",
    "black": "#725ac1",
    "void": "#00000000"
};
export const DEFAULT_FEN = "e1c1w1w1c1e/rnbgmkvgbnr/-r-n-b-g-m-k-v-e-c-w-p/11/11/11/11/-P-W-C-E-V-K-M-G-B-N-R/RNBQVKMGBNR/E1C1W1W1C1E w";
export const BOARD = new ChessBoard({ side: "white" });