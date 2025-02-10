import React, { useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CreditCardIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  CurrencyRupeeIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { FaBitcoin } from "react-icons/fa";

export default function RidePayments() {
  // Payment methods data
  const paymentMethods = [
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: <CreditCardIcon className="w-5 h-5" />,
      content: <CardPaymentContent />,
    },
    {
      id: "netBanking",
      label: "Net Banking",
      icon: <BuildingLibraryIcon className="w-5 h-5" />,
      content: <NetBankingContent />,
    },
    {
      id: "upi",
      label: "UPI",
      icon: <CurrencyRupeeIcon className="w-5 h-5" />,
      content: <UpiContent />,
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: <BanknotesIcon className="w-5 h-5" />,
      content: <CodContent />,
    },
    {
      id: "crypto",
      label: "Crypto",
      icon: <FaBitcoin className="w-5 h-5" />,
      content: <CryptoContent />,
    },
    {
      id: "wallets",
      label: "Wallets",
      icon: <WalletIcon className="w-5 h-5" />,
      content: <WalletsContent />,
    },
  ];

  // Track which accordion item is open (by id). If null, all are closed.
  const [openItem, setOpenItem] = useState("card"); // default open “Credit / Debit Card”

  // Toggle logic
  const toggleOpen = (id) => {
    if (openItem === id) {
      setOpenItem(null); // close if same item clicked
    } else {
      setOpenItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-4 md:p-6">
        {/* Header: Step indicator + Title + Secure Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Step 3 of 3</p>
            <h2 className="text-xl font-semibold">Payments</h2>
          </div>
          <div className="text-green-600 text-xs font-medium border border-green-600 rounded px-2 py-1">
            100% Secure
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Amount</span>
          <span className="text-lg font-semibold text-gray-800">₹3,902</span>
        </div>

        {/* Payment Options Accordion */}
        <div>
          {paymentMethods.map((method) => (
            <div key={method.id} className="border-b border-gray-200">
              <button
                className="w-full flex items-center justify-between py-3 text-left"
                onClick={() => toggleOpen(method.id)}
              >
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  {method.icon}
                  <span>{method.label}</span>
                </div>
                <div className="text-gray-500">
                  {openItem === method.id ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </div>
              </button>
              {openItem === method.id && (
                <div className="pb-4">{method.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 
  ---------------
  SUBCOMPONENTS
 ---------------
*/

// 1) CARD PAYMENT CONTENT
function CardPaymentContent() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showEmi, setShowEmi] = useState(false); // expand EMI options

  return (
    <div className="mt-1">
      {/* Basic Note */}
      <p className="text-xs text-gray-500 mb-2">
        Note: Please ensure your card is eligible for online transactions.
      </p>

      {/* Card Fields */}
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-sm text-gray-700">Card Number</label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Valid Thru</label>
            <input
              type="text"
              placeholder="MM / YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700">CVV</label>
            <input
              type="password"
              placeholder="***"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Pay or next step button */}
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-md py-2 mt-2">
          Pay ₹3,902
        </button>
      </div>

      {/* EMI Toggle */}
      <div className="mt-4">
        <button
          onClick={() => setShowEmi(!showEmi)}
          className="text-blue-600 text-sm font-medium underline flex items-center gap-1"
        >
          {showEmi ? "Hide EMI options" : "Show EMI options"}
        </button>
      </div>
      {showEmi && <EmiDetails />}
    </div>
  );
}

// 1.1) EMI DETAILS
function EmiDetails() {
  const [selectedBank, setSelectedBank] = useState("SBI");

  // Example bank EMI data
  const banks = [
    {
      id: "SBI",
      name: "State Bank of India",
      monthlyEmi: 355,
      interestPA: 16.5,
      plans: [
        { months: 3, amount: 1337, interest: 16.5, popular: true },
        { months: 6, amount: 682, interest: 16 },
        { months: 9, amount: 463, interest: 16 },
        { months: 12, amount: 355, interest: 16 },
      ],
    },
    {
      id: "HDFC",
      name: "HDFC Bank",
      monthlyEmi: 192,
      interestPA: 14.0,
      plans: [
        { months: 3, amount: 1300, interest: 14 },
        { months: 6, amount: 650, interest: 14 },
        { months: 9, amount: 430, interest: 14 },
        { months: 12, amount: 320, interest: 14 },
      ],
    },
    {
      id: "AXIS",
      name: "Flipkart Axis Bank",
      monthlyEmi: 192,
      interestPA: 15.5,
      plans: [
        { months: 3, amount: 1299, interest: 15.5 },
        { months: 6, amount: 680, interest: 15.5 },
        { months: 9, amount: 460, interest: 15.5 },
        { months: 12, amount: 350, interest: 15.5 },
      ],
    },
  ];

  const selectedBankData = banks.find((b) => b.id === selectedBank);

  return (
    <div className="border border-gray-200 rounded-md p-3 mt-2">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Get EMI in 3 easy steps
      </h4>

      {/* Step Progress (like “Choose bank -> Choose Plan -> Confirm & Pay”) */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
            1
          </div>
          <span className="ml-1">Choose bank</span>
        </div>
        <span className="text-gray-300">›</span>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
            2
          </div>
          <span className="ml-1">Choose plan</span>
        </div>
        <span className="text-gray-300">›</span>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
            3
          </div>
          <span className="ml-1">Confirm & Pay</span>
        </div>
      </div>

      {/* Bank selection */}
      <div className="space-y-2 mb-3">
        {banks.map((bank) => (
          <div key={bank.id} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="bank"
              id={`bank-${bank.id}`}
              checked={selectedBank === bank.id}
              onChange={() => setSelectedBank(bank.id)}
            />
            <label htmlFor={`bank-${bank.id}`} className="text-gray-700">
              {bank.name} – EMI ₹{bank.monthlyEmi}/m
            </label>
          </div>
        ))}
      </div>

      {/* Show plans for selected bank */}
      <div className="mt-3 bg-gray-50 border border-gray-200 rounded-md p-3">
        <h5 className="text-sm text-gray-700 font-medium mb-2">
          {selectedBankData?.name} Credit Card EMI Plans
        </h5>
        {selectedBankData?.plans.map((plan, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-1 text-sm text-gray-700"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="plan"
                id={`plan-${selectedBank}-${plan.months}`}
              />
              <label
                htmlFor={`plan-${selectedBank}-${plan.months}`}
                className="cursor-pointer"
              >
                {`₹${plan.amount} for ${plan.months} month${
                  plan.months > 1 ? "s" : ""
                }`}
                {plan.popular && (
                  <span className="ml-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </label>
            </div>
            <div className="text-gray-500 text-xs">{plan.interest}% p.a.</div>
          </div>
        ))}

        {/* Price breakdown sample */}
        <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-700">
          <div className="flex justify-between mb-1">
            <span>Price (1 item)</span>
            <span>₹3,899</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Interest charged by Bank</span>
            <span>₹108</span>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span>Total Amount</span>
            <span>₹3,902</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md py-2 w-full mt-3">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
}

// 2) NET BANKING CONTENT
function NetBankingContent() {
  const banks = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"];

  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  return (
    <div className="mt-1 border border-gray-200 rounded-md p-3">
      <h4 className="text-sm text-gray-700 mb-2 font-medium">
        Select Your Bank
      </h4>
      <div className="flex flex-col space-y-2">
        {banks.map((bank) => (
          <label
            key={bank}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="radio"
              name="nb"
              checked={selectedBank === bank}
              onChange={() => setSelectedBank(bank)}
            />
            {bank}
          </label>
        ))}
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-md py-2 w-full mt-3">
        Pay ₹3,902
      </button>
    </div>
  );
}

// 3) UPI CONTENT
function UpiContent() {
  const upiApps = ["Google Pay", "PhonePe", "Cred", "Add new UPI ID"];
  const [selectedApp, setSelectedApp] = useState("Google Pay");

  return (
    <div className="mt-1 border border-gray-200 rounded-md p-3">
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        Choose a UPI App
      </h4>
      <div className="flex flex-col space-y-2">
        {upiApps.map((app) => (
          <label
            key={app}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="radio"
              name="upi"
              checked={selectedApp === app}
              onChange={() => setSelectedApp(app)}
            />
            {app}
          </label>
        ))}
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-md py-2 w-full mt-3">
        Pay ₹3,902
      </button>
    </div>
  );
}

// 4) CASH ON DELIVERY CONTENT
function CodContent() {
  return (
    <div className="mt-1 border border-gray-200 rounded-md p-3">
      <p className="text-sm text-gray-700 mb-1">
        Due to handling costs, a nominal fee of ₹10 will be charged.
      </p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-md py-2 w-full mt-3">
        Place Order
      </button>
    </div>
  );
}

// 5) CRYPTO CONTENT
function CryptoContent() {
  return (
    <div className="mt-1 border border-gray-200 rounded-md p-3">
      <p className="text-sm text-gray-600">
        Pay securely with your preferred crypto. Accepted coins may include:
        <strong> Bitcoin, Ethereum, USDT</strong>, etc.
      </p>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose Your Crypto
        </label>
        <select className="border border-gray-300 rounded-md px-2 py-2 text-sm w-full focus:ring-1 focus:ring-blue-400">
          <option>Bitcoin (BTC)</option>
          <option>Ethereum (ETH)</option>
          <option>Tether (USDT)</option>
        </select>
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-md py-2 w-full mt-3">
        Pay via Crypto
      </button>
    </div>
  );
}

// 6) WALLETS CONTENT
function WalletsContent() {
  const [phonePeNumber, setPhonePeNumber] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("PhonePe");

  const wallets = [
    { id: "phonepe", label: "PhonePe Wallet" },
    { id: "paytm", label: "Paytm Wallet" },
    { id: "amazonpay", label: "Amazon Pay" },
  ];

  return (
    <div className="mt-1 border border-gray-200 rounded-md p-3">
      {wallets.map((wallet) => (
        <div key={wallet.id} className="flex items-center gap-2 text-sm mb-2">
          <input
            type="radio"
            name="wallet"
            id={wallet.id}
            checked={selectedWallet === wallet.label}
            onChange={() => setSelectedWallet(wallet.label)}
          />
          <label htmlFor={wallet.id} className="text-gray-700">
            {wallet.label}
          </label>
        </div>
      ))}

      {/* Example for phonepe with a phone number field */}
      {selectedWallet === "PhonePe Wallet" && (
        <div className="mt-2">
          <label className="block text-sm text-gray-700">
            PhonePe Linked Mobile Number
          </label>
          <input
            type="text"
            value={phonePeNumber}
            onChange={(e) => setPhonePeNumber(e.target.value)}
            placeholder="Enter phone number"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md py-2 w-full mt-2">
            Link
          </button>
        </div>
      )}

      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-md py-2 w-full mt-3">
        Pay ₹3,902
      </button>
    </div>
  );
}
