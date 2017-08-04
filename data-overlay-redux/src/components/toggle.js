import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let Toggle = class Toggle extends React.Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { options, active } = this.props;

    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input onChange={() => this.props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
        </label>
      );
    }

    return (
      <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
        {options.map(renderOptions)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    active: state.active
  };
}

Toggle = connect(mapStateToProps)(Toggle);

export default Toggle;
