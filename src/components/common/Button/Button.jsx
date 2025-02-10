import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import "../Button/button.css";
import google_img from "../../../assets/photo/google_img.png";

const Button = () => {

  const handleGoogleSignup = () => {
    window.location.href = "https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmail.google.com%2Fmail&ec=GAlAFw&hl=en&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S1141412934%3A1720115243140910&ddm=0";
  };

  return (
    <BootstrapButton
      variant="light"
      className="flex items-center justify-center w-full py-2 d-flex button_google"
      onClick={handleGoogleSignup}
    >
      <img src={google_img} alt="" className="h-4 google_signup" />
      Sign up with Google
    </BootstrapButton>
  );
};

const styles = {
  button: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#4285F4",
    color: "white",
    borderRadius: "5px",
    outline: "none",
  },
  logo: {
    marginRight: "10px",
    width: "20px",
    height: "20px",
  },
};

export default Button;
