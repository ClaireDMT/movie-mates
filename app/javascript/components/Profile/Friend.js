import React from 'react';

const Friend = (props) => {
  return (
    <div className="friend__card">
      <div className="friend__pic">
      </div>
      <div className="friend__name">{props.attributes.first_name} </div>
    </div>
  );
};

export default Friend;
