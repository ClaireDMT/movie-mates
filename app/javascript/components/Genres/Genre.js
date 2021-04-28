import React from 'react';

const Genre = (props) => {
  return (
    <div className="card-genre">
      <div className="genre-logo">
        <img src={props.attributes.logo} alt="wait"/>
      </div>
      <div className="genre-name">{props.attributes.name} </div>
    </div>
  );
};

export default Genre;
