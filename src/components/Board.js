import React, { Component } from 'react';

import Line from './Line';

var timerId;

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: [],
      width: 50,
      height: 30,
      generation: 0,
      speed: 300,
      status: 'run'
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
    this.setState({board: currentBoard, generation: generationNumber, status: 'run'});
  }
  handleRun(){
    clearInterval(timerId);
    timerId = setInterval(() => {this.nextGeneration();}, this.state.speed);
  }
  handlePause(){
    clearInterval(timerId);
    this.setState({status: 'pause'});
  }
  handleClear(){
    var board = [];
    for (let i=0; i<this.state.width; i++) {
      let line = [];
      for (let j=0; j<this.state.height; j++) {
        line.push(0);
      }
      board.push(line);
    }
    this.setState({
      board: board,
      generation: 0,
      status: 'clear'
    });
  }
  handleSize(w, h){
    this.setState({
      width: w,
      height: h,
      generation: 0
    }, () => {this.setBoard();});
  }
  handleSpeed(s) {
    this.setState({
      speed: s
    }, () => {this.handleRun()});
  }
  handleClick(event) {
    let coordinates = event.target.id.split('_');
    let x = coordinates[0];
    let y = coordinates[1];
    let currentBoard = this.state.board;
    currentBoard[x][y] = 1;
    this.setState({board: currentBoard});
  }
  componentWillMount(){
    if (!this.state.generation) {
      this.setBoard();
      timerId = setInterval(() => {this.nextGeneration();}, this.state.speed);
    }
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
    let styleUpScreen = {
      width: this.state.width*8,
      height: 50
    }
    let styleDownScreen = {
      width: this.state.width*8,
      height: 100
    }
    var boardList = this.state.board.map((line, index) => {
      return <div key={"line"+index} className='line'><Line number={index} line={line}/></div>
    });
    return (
      <div>
        <div className="board-header">
          <h2>Generation: {this.state.generation}</h2>

        </div>
        <div style={styleUpScreen} className="upScreen">
          <button onClick={this.handleRun.bind(this)}
            type='button'
            className={(this.state.status === 'run') ? "button active" : "button"}>
            Run
          </button>
          <button onClick={this.handlePause.bind(this)}
            type='button'
            className={(this.state.status === 'pause') ? "button active" : "button"}>
            Pause
          </button>
          <button onClick={this.handleClear.bind(this)}
            type='button'
            className={(this.state.status === 'clear') ? "button active" : "button"}>
            Clear
          </button>
        </div>
        <div style={styleScreen} className="screen">
          <div onClick={(event) => {this.handleClick(event)}} style={styleBoard} className="board">
            {boardList}
          </div>
        </div>
        <div  style={styleDownScreen} className="downScreen">
        <div>
          Board Size:
          <button onClick={this.handleSize.bind(this, 50, 30)}
            type='button'
            className={(this.state.width === 50) ? "button active" : "button"}>
            50 x 30
          </button>
          <button onClick={this.handleSize.bind(this, 70, 50)}
            type='button'
            className={(this.state.width === 70) ? "button active" : "button"}>
            70 x 50
          </button>
          <button onClick={this.handleSize.bind(this, 100, 80)}
            type='button'
            className={(this.state.width === 100) ? "button active" : "button"}>
            100 x 80
          </button>
        </div>
        <div>
          Sim Speed:
          <button onClick={this.handleSpeed.bind(this, 1300)}
            type='button'
            className={(this.state.speed === 1300) ? "button active" : "button"}>
            Slow
          </button>
          <button onClick={this.handleSpeed.bind(this, 700)}
            type='button'
            className={(this.state.speed === 700) ? "button active" : "button"}>
            Medium
          </button>
          <button onClick={this.handleSpeed.bind(this, 300)}
            type='button'
            className={(this.state.speed === 300) ? "button active" : "button"}>
            Fast
          </button>
        </div>
        <div className="note">Feel free to add cells while
          it is running or after clearing. The pink cells
          are younger, red are older. Enjoy!
         </div>
         <footer>
           Made by Maryna Martynenko 2017<br />
           <a href='https://github.com/alivemary/GameOfLife'>GitHub Repository</a>
         </footer>
        </div>
      </div>
    );
  }
}

export default Board;
