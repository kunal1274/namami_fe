import React from 'react';

const WelcomeMessage = ({ text, style ,cls}) => {
  return (
    <div className={cls} style={style}>
      { text }
      {/* <h2 className="text-xl font-semibold">Hi, Welcome to Freight Management System!</h2> */}
    </div>
  );
};

export default WelcomeMessage; 

