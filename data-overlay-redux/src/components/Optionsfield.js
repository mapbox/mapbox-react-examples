import React from 'react';
import { useSelector } from 'react-redux';
import { activeSelector, optionsSelector } from '../redux/selectors';

const Optionsfield = (props) => {
  const options = useSelector(optionsSelector);
  const active = useSelector(activeSelector);
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => props.changeState(option)}
          checked={option.property === active.property}
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
      {options.map(renderOptions)}
    </div>
  );
};

export default Optionsfield;
