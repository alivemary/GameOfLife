import React, { Component } from 'react';

import Line from './Line';
import ButtonGroup from './ButtonGroup';

var timerId;
const SIZE_WIDTH_MIN = 50;
const SIZE_HEIGTH_MIN = 30;
const SIZE_WIDTH_MEDIUM = 70;
const SIZE_HEIGTH_MEDIUM = 50;
const SIZE_WIDTH_BIG = 100;
const SIZE_HEIGTH_BIG = 80;
const SPEED_FAST = 300;
const SPEED_MEDIUM = 600;
const SPEED_SLOW = 900;

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: [],
      width: SIZE_WIDTH_MIN,
      height: SIZE_HEIGTH_MIN,
      generation: 0,
      speed: SPEED_FAST,
      status: 'run'
    }
    this.handleSize = this.handleSize.bind(this);
    this.handleSpeed = this.handleSpeed.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleClear = this.handleClear.bind(this);
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
  handleSize(w){
    let h;
    switch (w) {
      case SIZE_WIDTH_MIN:
        h=SIZE_HEIGTH_MIN;
        break;
      case SIZE_WIDTH_MEDIUM:
        h=SIZE_HEIGTH_MEDIUM;
        break;
      case SIZE_WIDTH_BIG:
        h=SIZE_HEIGTH_BIG;
        break;
    }
    this.setState({
      width: w,
      height: h,
      generation: 0
    }, () => {this.setBoard();});
  }
  handleSpeed(s) {
    this.setState({
      speed: s
    }, () => {if (this.state.status === 'run') this.handleRun()});
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
    let boardList = this.state.board.map((line, index) => {
      return <div key={"line"+index} className='line'><Line number={index} line={line}/></div>
    });
    return (
      <div>
        <div className="board-header">
          <h2>Generation: {this.state.generation}</h2>

        </div>
        <div style={styleUpScreen} className="upScreen">
          <ButtonGroup title=''
            buttons={[
              {title: 'Run', current: this.state.status==='run', data: 0, activity: this.handleRun},
              {title: 'Pause', current: this.state.status==='pause', data: 0, activity: this.handlePause},
              {title: 'Clear', current: this.state.width==='clear', data: 0, activity: this.handleClear}
            ]}/>
        </div>
        <div style={styleScreen} className="screen">
          <div onClick={(event) => {this.handleClick(event)}} style={styleBoard} className="board">
            {boardList}
          </div>
        </div>
        <div  style={styleDownScreen} className="downScreen">
          <ButtonGroup title='Board Size:'
            buttons={[
              {title: '50 x 30', current: this.state.width===SIZE_WIDTH_MIN, data: SIZE_WIDTH_MIN, activity: this.handleSize},
              {title: '70 x 50', current: this.state.width===SIZE_WIDTH_MEDIUM, data: SIZE_WIDTH_MEDIUM, activity: this.handleSize},
              {title: '100 x 80', current: this.state.width===SIZE_WIDTH_BIG, data: SIZE_WIDTH_BIG, activity: this.handleSize}
            ]}/>
          <ButtonGroup title='Sim Speed:'
            buttons={[
              {title: 'Slow', current: this.state.speed===SPEED_SLOW, data: SPEED_SLOW, activity: this.handleSpeed},
              {title: 'Medium', current: this.state.speed===SPEED_MEDIUM, data: SPEED_MEDIUM, activity: this.handleSpeed},
              {title: 'Fast', current: this.state.speed===SPEED_FAST, data: SPEED_FAST, activity: this.handleSpeed}
            ]}/>

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
