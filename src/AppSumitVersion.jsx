import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./Customer/Page";

function AppSumitVersion() {
  return (
    <div className="flex justify-center container_app">
      <Routes>
        <Route path="/" element={<Page />} />
        {/*  */}
      </Routes>
    </div>
  );
}

export default AppSumitVersion;
