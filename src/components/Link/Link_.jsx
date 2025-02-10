import React from "react";
import "./Link.css";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ cls,className,label, linkText, linkUrl}) => {
  return (
    <h6 className={cls}>
       {label}{" "}
       {/* <RouterLink className={className} to={linkUrl}> */}
        <a className ={className} href={linkUrl} >
        {/* </RouterLink> */}
          {linkText}
        </a>  
    </h6> 
  );
};

export default Link;
