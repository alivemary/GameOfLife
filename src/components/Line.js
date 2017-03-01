import React, { Component } from 'react';

class Line extends Component {
  render() {

    var elementList = this.props.line.map((element, index) => {
      let style;
      switch (element) {
        case 1: {
          style = {
            backgroundColor: 'pink'
          };
          break;
        }
        case 2: {
          style = {
            backgroundColor: 'red'
          };
          break;
        }
        default: {
          style = {
            backgroundColor: 'black'
          };
          break;
        }
      }
      return <div style={style} key={"square"+index} className='element'>{element}</div>
    });
    return (
      <div>
        {elementList}
      </div>
    );
  }
}

export default Line;
