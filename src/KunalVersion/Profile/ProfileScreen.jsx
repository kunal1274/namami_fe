import React, { useState } from "react";
import { ProfilePage } from "./ProfilePage";
import { DriverProfilePage } from "./DriverProfilePage";
import { ChatScreen } from "./ChatScreen";
import { LocationNotFound } from "./LocationNotFound";
import { PaymentProcessing } from "./PaymentProcessing";
import { UnpaidOrder } from "./UnpaidOrder";

export default function ProfileScreen() {
  const [screen, setScreen] = useState("profileUser");

  return (
    <div className="App">
      {screen === "profileUser" && <ProfilePage />}
      {screen === "profileDriver" && <DriverProfilePage />}
      {screen === "chat" && <ChatScreen />}
      {screen === "locationError" && <LocationNotFound />}
      {screen === "paymentProcessing" && <PaymentProcessing />}
      {screen === "unpaidOrder" && <UnpaidOrder />}

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
        <button
          onClick={() => setScreen("profileUser")}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          UserProfile
        </button>
        <button
          onClick={() => setScreen("profileDriver")}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          DriverProfile
        </button>
        <button
          onClick={() => setScreen("chat")}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          Chat
        </button>
        <button
          onClick={() => setScreen("locationError")}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          LocError
        </button>
        <button
          onClick={() => setScreen("paymentProcessing")}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          PaymentProcessing
        </button>
        <button
          onClick={() => setScreen("unpaidOrder")}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          UnpaidOrder
        </button>
      </div>
    </div>
  );
}
