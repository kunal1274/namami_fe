import React from "react";
import { FaEyeSlash } from "react-icons/fa";
// import { IoPersonOutline } from "react-icons/io5";
// import { FaSearch } from "react-icons/fa";

import "../Input/Input.css";
// import { Input } from 'postcss';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className,
  toggleVisibility,
  isPasswordVisible,
  icons,
}) => {
  return (
    <div className="relative">
      <input type="" placeholder="" className="" name= 'name' />

      {toggleVisibility && (
        <span
          onClick={toggleVisibility}
          className="absolute cursor-pointer right-3 top-3"
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEyeSlash />}
        </span>
      )}
    </div>
  );
};

export default Input;
