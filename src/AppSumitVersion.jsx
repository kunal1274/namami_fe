import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./Page/Dashbord";

function AppSumitVersion() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Page />} />
        {/*  */}
      </Routes>
    </div>
  );
}

export default AppSumitVersion;
