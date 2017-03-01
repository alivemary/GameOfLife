import React, { Component } from 'react';
import Line from './Line';

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: []
    }
  }
  setBoard(){
    var boardWidth = 50;
    var boardHeigh = 30;
    var board = [];
    for (let i=0; i<boardWidth; i++) {
      let line = [];
      for (let j=0; j<boardHeigh; j++) {
        let randomLife = Math.floor(Math.random()*3);
        line.push(randomLife);
      }
      board.push(line);
    }
    this.setState({
      board: board
    });
  }
  componentWillMount(){
    this.setBoard();
  }
  render() {

    var boardList = this.state.board.map((line, index) => {
      return <div key={"line"+index} className='line'><Line line={line}/></div>
    });
    return (
      <div>
        <div className="board-header">
          <h2>Board</h2>
        </div>
        <div className="screen">
          <div className="board">
            {boardList}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
