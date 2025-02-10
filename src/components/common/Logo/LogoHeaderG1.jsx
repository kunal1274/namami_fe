import React from 'react';
import logo from "../../../assets/logo/logo.png";

const LogoHeader = () => {
  return (
    <div className="flex items-center space-x-2">
      <img src={logo} alt="Freight Logo" className="w-10 h-10" />
      <h1 className="text-2xl font-bold">Freight</h1>
    </div>
  );
};

export default LogoHeader;
