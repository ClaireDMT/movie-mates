import React from 'react';
import logo from '../../images/genres/western5_pink.svg';

const Genre = (props) => {
  const isSelected = props.selected ? "selected" : "";
  const cardClass = "genre__card " + isSelected;
  return (
    <div className={cardClass} onClick={props.onClick}>
      <div className="genre__logo">
        <img src={logo} alt="wait"/>
      </div>
      <div className="genre__name">{props.attributes.name} </div>
    </div>
  );
};

export default Genre;
