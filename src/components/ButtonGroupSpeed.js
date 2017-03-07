import React, { Component } from 'react';

export default class ButtonGroupSpeed extends Component {

  static propTypes = {
    speed: React.PropTypes.number,
    title: React.PropTypes.string,
    changeSpeed: React.PropTypes.func
  }

  static defaultProps = {
    speed: 300,
    title: "",
    changeSpeed: () => {return null}
  }

  handleSpeed(speed){
    this.props.changeSpeed(speed);
  }

  render() {
    let styleActive = {
      backgroundColor: 'pink',
      color: 'black'
    }
    let style = {
      backgroundColor: 'black',
      color: 'white'
    }
    return(
      <div>
        {this.props.title}:
        <button onClick={this.handleSpeed.bind(this, 1300)}
          type='button' className="button"
          style={(this.props.speed === 1300) ? styleActive : style}>
          Slow
        </button>
        <button onClick={this.handleSpeed.bind(this, 700)}
          type='button'  className="button"
          style={(this.props.speed === 700) ? styleActive : style}>
          Medium
        </button>
        <button onClick={this.handleSpeed.bind(this, 300)}
          type='button'  className="button"
          style={(this.props.speed === 300) ? styleActive : style}>
          Fast
        </button>
      </div>
    );
  }
}
