import React, { Component } from 'react';
import Line from './Line';

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: [],
      width: 20,
      height: 30,
      generation: 0
    }
  }
  setBoard(){
    var board = [];
    for (let i=0; i<this.state.width; i++) {
      let line = [];
      for (let j=0; j<this.state.height; j++) {
        let randomLife = Math.floor(Math.random()*3);
        line.push(randomLife);
      }
      board.push(line);
    }
    this.setState({
      board: board
    });
  }
  checkNeighbors(i, j){
    let neighbors = 0;
    for (let k=(i>0)? i-1 : 0; k<=i+1; k++){
      for (let m=(j>0)? j-1 : 0; m<=j+1; m++){
        if (k<this.state.width &&  m<this.state.height) {
          if (!(m===j && k===i) && this.state.board[k][m]>0) neighbors++;
        };
      }
    }
    return neighbors;
  }
  nextGeneration(){
    let currentBoard = [];
    for (let i=0; i<this.state.board.length; i++) {
      let currentLine = [];
      for (let j=0; j<this.state.board[i].length; j++) {
        let neighborsNumber = this.checkNeighbors(i, j);
        switch (this.state.board[i][j]) {
          case 0:
            {
              if (neighborsNumber === 3) currentLine.push(1);
              else currentLine.push(0);
              break;
            }
          default:
            if (neighborsNumber === 3 || neighborsNumber === 2) currentLine.push(2);
            else currentLine.push(0);
        }

      }
      currentBoard.push(currentLine);
    }
    let generationNumber = this.state.generation+1;
    this.setState({board: currentBoard, generation: generationNumber});
  }
  componentWillMount(){
    if (!this.state.generation) this.setBoard();
  }
  render() {
    let styleBoard = {
      width: this.state.width*10,
      height: this.state.height*10
    }
    let styleScreen = {
      width: this.state.width*10+40,
      height: this.state.height*10+20
    }
    var boardList = this.state.board.map((line, index) => {
      return <div key={"line"+index} className='line'><Line line={line}/></div>
    });
    return (
      <div>
        <div className="board-header">
          <h2>Generation: {this.state.generation}</h2>
          <button onClick={this.nextGeneration.bind(this)} type='button'>Next Generation</button>
        </div>
        <div style={styleScreen} className="screen">
          <div style={styleBoard} className="board">
            {boardList}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
