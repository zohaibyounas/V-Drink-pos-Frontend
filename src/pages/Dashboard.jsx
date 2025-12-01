import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getDashboard } from "../utils/api";
import TaxSummaryCard from "../components/TaxSummaryCard";
import {
  PlusIcon,
  MinusIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [showCashModal, setShowCashModal] = useState(false);
  const [cashAmount, setCashAmount] = useState("");
  const [cashType, setCashType] = useState("in"); // "in" or "out"
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(() =>
        setData({
          openingCash: 100000,
          totalSalesToday: 42000,
          cashIn: 15000,
          cashOut: 4000,
          taxableSalesMonth: 250000,
          taxCollectedMonth: 37500,
          taxReversedMonth: 5000,
          closingBalance: 111000, // Added for better UX
        })
      );
  };

  const handleAddCash = async () => {
    if (!cashAmount || parseFloat(cashAmount) <= 0) return;

    setIsLoading(true);
    try {
      // Call API to add cash
      // await addCashTransaction({ amount: cashAmount, type: cashType });
      fetchDashboardData(); // Refresh data
      setShowCashModal(false);
      setCashAmount("");
    } catch (error) {
      console.error("Error adding cash:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateClosingBalance = () => {
    if (!data) return 0;
    return data.openingCash + data.cashIn - data.cashOut;
  };

  if (!data)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  const finalTax = (data.taxCollectedMonth || 0) - (data.taxReversedMonth || 0);
  const closingBalance = calculateClosingBalance();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of your daily cash flow and tax summary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* DAILY CASH SUMMARY */}
            <Card
              title="Daily Cash Summary"
              className="bg-white shadow-lg rounded-xl"
            >
              <div className="space-y-6">
                {/* Opening and Closing Balance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          Opening Cash
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          PKR {data.openingCash.toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">O</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">
                          Closing Balance
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          PKR {closingBalance.toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">C</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cash Flow Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Sales (Today)</p>
                    <p className="text-xl font-semibold text-gray-900 mt-1">
                      PKR {data.totalSalesToday.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white border border-green-100 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <PlusIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cash Added</p>
                        <p className="text-xl font-semibold text-green-700 mt-1">
                          PKR {data.cashIn?.toLocaleString() ?? 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-red-100 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <MinusIcon className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cash Removed</p>
                        <p className="text-xl font-semibold text-red-700 mt-1">
                          PKR {data.cashOut?.toLocaleString() ?? 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* QUICK ACTIONS */}
            <Card
              title="Quick Actions"
              className="bg-white shadow-lg rounded-xl"
            >
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setCashType("in");
                    setShowCashModal(true);
                  }}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Cash
                </button>

                <button
                  onClick={() => {
                    setCashType("out");
                    setShowCashModal(true);
                  }}
                  className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <MinusIcon className="w-5 h-5 mr-2" />
                  Remove Cash
                </button>

                <button className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                  Import Sales
                </button>
              </div>
            </Card>
          </div>

          {/* RIGHT SECTION - TAX SUMMARY */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tax Summary
              </h3>
              <div className="space-y-4">
                <TaxSummaryCard
                  label="Taxable Sales"
                  value={data.taxableSalesMonth}
                  className="bg-blue-50"
                />

                <TaxSummaryCard
                  label="Tax Collected"
                  value={data.taxCollectedMonth}
                  className="bg-green-50"
                />

                <TaxSummaryCard
                  label="Tax Reversed"
                  value={data.taxReversedMonth}
                  className="bg-red-50"
                />
              </div>
            </div>

            <Card
              title="Final Sales Tax Payable"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            >
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  PKR {finalTax.toLocaleString()}
                </p>
                <p className="text-blue-200 text-sm">
                  Computed as <b>collected − reversed</b> (refunds)
                </p>
                <button className="mt-4 w-full py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  View Detailed Report
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Cash Modal */}
      {showCashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {cashType === "in" ? "Add Cash" : "Remove Cash"}
                </h3>
                <button
                  onClick={() => setShowCashModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (PKR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">PKR</span>
                  </div>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    autoFocus
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Current balance: PKR {closingBalance.toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Add a note about this transaction"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddCash}
                  disabled={isLoading || !cashAmount}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    cashType === "in"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  } ${
                    isLoading || !cashAmount
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isLoading
                    ? "Processing..."
                    : cashType === "in"
                    ? "Add Cash"
                    : "Remove Cash"}
                </button>
                <button
                  onClick={() => setShowCashModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
