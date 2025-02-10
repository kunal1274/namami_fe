import React, { useState } from "react";
import AddCardPage from "./AddCardPage";
import { ScanCardPage } from "./ScanCardPage";

function CardPage() {
  const [showScan, setShowScan] = useState(false);

  return <div>{!showScan ? <AddCardPage /> : <ScanCardPage />}</div>;
}

export default CardPage;
