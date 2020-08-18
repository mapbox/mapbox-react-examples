import React from "react";
import { connect } from 'react-redux'

const Optionsfield = (props) => {
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => props.changeState(option)}
          checked={option.property === props.active.property}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white">
          {option.name}
        </div>
      </label>
    );
  };
  return (
    <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
      {props.options.map(renderOptions)}
    </div>
  );
};

function mapStateToPropsOptionsfield(state) {
  return {
    options: state.options,
    active: state.active,
  };
}

const ConnectedOptionsfield = connect(mapStateToPropsOptionsfield)(Optionsfield);


export default ConnectedOptionsfield;
