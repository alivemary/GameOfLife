import React, { Component } from 'react';

export default class Button extends Component {
  static propTypes = {
    current: React.PropTypes.bool,
    title: React.PropTypes.string,
    activity: React.PropTypes.func,
    data: React.PropTypes.number
  }

  static defaultProps = {
    current: false,
    title: "Button",
    activity: () => {return null},
    data: 0
  }
  handleClick(data) {
    this.props.activity(data);
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
      <button onClick={this.handleClick.bind(this, this.props.data)}
        type='button' className="button"
        style={(this.props.current) ? styleActive : style}>
        {this.props.title}
      </button>
    );
  }
}
