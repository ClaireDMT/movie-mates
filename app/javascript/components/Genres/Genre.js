import React from 'react';
import './Genre.scss';

const Genre = (props) => {
  return (
    <div className="genre__card">
      <div className="genre-logo">
        <img src={props.attributes.logo} alt="wait"/>
      </div>
      <div className="genre-name">{props.attributes.name} </div>
    </div>
  );
};

export default Genre;
