import React from 'react';
import logo from '../../images/genres/western5_pink.svg';

const Genre = (props) => {
  return (
    <div className="genre__card">
      <div className="genre__logo">
        <img src={logo} alt="wait"/>
      </div>
      <div className="genre__name">{props.attributes.name} </div>
    </div>
  );
};

export default Genre;
