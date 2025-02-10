import React from "react";
import "./Right_side.css";
import right_side from "../../../assets/photo/right_side.png";
const Right_side = ({ widthClass, heightClass }) => {
  return (
    <div className="flex items-center justify-end h-screen">
      <div className="h-auto ">
        <img
          src={right_side}
          alt="Description of the image"
          className={`right_pic ${widthClass} ${heightClass}`} 
        />
      </div>
    </div>
  );
};

export default Right_side;
