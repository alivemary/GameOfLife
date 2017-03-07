import React, { Component } from 'react';

export default class ButtonGroupSize extends Component {

  static propTypes = {
    width: React.PropTypes.number,
    title: React.PropTypes.string,
    changeSize: React.PropTypes.func
  }

  static defaultProps = {
    width: 50,
    title: "",
    changeSize: () => {return null}
  }

  handleSize(w, h){
    this.props.changeSize(w, h);
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
        <button onClick={this.handleSize.bind(this, 50, 30)}
          type='button' className="button"
          style={(this.props.width === 50) ? styleActive : style}>
          50 x 30
        </button>
        <button onClick={this.handleSize.bind(this, 70, 50)}
          type='button'  className="button"
          style={(this.props.width === 70) ? styleActive : style}>
          70 x 50
        </button>
        <button onClick={this.handleSize.bind(this, 100, 80)}
          type='button'  className="button"
          style={(this.props.width === 100) ? styleActive : style}>
          100 x 80
        </button>
      </div>
    );
  }
}
