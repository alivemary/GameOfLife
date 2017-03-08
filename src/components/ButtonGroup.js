import React, { Component } from 'react';

import Button from './Button';

export default class ButtonGroup extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    buttons: React.PropTypes.array
  }

  static defaultProps = {
    title: 'Buttons Group',
    buttons: []
  }
render() {
  let buttonsList = this.props.buttons.map(
    (button) => {
      return <Button activity={button.activity.bind(this, button.data)}
        current={button.current}
        data={button.data}
        title={button.title}/>
    }
  );
  return(
    <div>
    {this.props.title}
      {buttonsList}
    </div>
  );
}
}
