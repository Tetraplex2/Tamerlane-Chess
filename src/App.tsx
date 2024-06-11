import React from "react";
import "./App.scss";
import { ChessBoard } from "./components/board/Board";

class App extends React.Component {
    render() {
        return <ChessBoard side="white" />;
    }
}

export default App;
