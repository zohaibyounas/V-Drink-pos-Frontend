import React, { useState } from "react";
import {
  Upload,
  Edit3,
  PlusCircle,
  MinusCircle,
  Clock,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Wallet,
  Shield,
} from "lucide-react";
import Card from "../components/Card";
import CashModal from "../components/CashModal";

export default function CashRegister() {
  const [open, setOpen] = useState(false);
  const [cashType, setCashType] = useState("in");
  const [openingCash, setOpeningCash] = useState(100000);
  const [isEditingOpening, setIsEditingOpening] = useState(false);
  const [tempOpeningCash, setTempOpeningCash] = useState("");

  // Mock data
  const cashFlowData = {
    todayTotal: 42000,
    cashIn: 15000,
    cashOut: 4000,
    closingBalance: openingCash + 15000 - 4000 + 42000,
  };

  const recentTransactions = [
    {
      id: 1,
      type: "in",
      amount: 5000,
      description: "Bank deposit",
      time: "10:30 AM",
      date: "Today",
    },
    {
      id: 2,
      type: "out",
      amount: 2000,
      description: "Petty cash",
      time: "11:45 AM",
      date: "Today",
    },
    {
      id: 3,
      type: "in",
      amount: 10000,
      description: "Cash sales",
      time: "2:15 PM",
      date: "Today",
    },
    {
      id: 4,
      type: "out",
      amount: 2000,
      description: "Office supplies",
      time: "4:30 PM",
      date: "Today",
    },
  ];

  const handleEditOpeningCash = () => {
    if (!isEditingOpening) {
      setTempOpeningCash(openingCash.toString());
      setIsEditingOpening(true);
    } else {
      const newValue = parseFloat(tempOpeningCash) || openingCash;
      setOpeningCash(newValue);
      setIsEditingOpening(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingOpening(false);
    setTempOpeningCash("");
  };

  const handleOpenModal = (type) => {
    setCashType(type);
    setOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cash Register</h1>
            <p className="text-gray-600 mt-2">
              Manage your daily cash flow and transactions
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Opening Cash Card */}
          <Card
            title="Opening Cash Balance"
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
            icon={<Wallet className="w-6 h-6 text-blue-600" />}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Today's Opening Balance
                  </p>
                  {isEditingOpening ? (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">PKR</span>
                        </div>
                        <input
                          type="number"
                          value={tempOpeningCash}
                          onChange={(e) => setTempOpeningCash(e.target.value)}
                          className="pl-16 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-2xl font-bold"
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleEditOpeningCash}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p className="text-4xl font-bold text-gray-900">
                        PKR {openingCash.toLocaleString()}
                      </p>
                      <button
                        onClick={handleEditOpeningCash}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit opening cash"
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    <Clock size={14} />
                    Set Daily
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Last updated: Today, 9:00 AM
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Cash Added Today
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          PKR {cashFlowData.cashIn.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Cash Removed Today
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          PKR {cashFlowData.cashOut.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Closing Balance</p>
                        <p className="text-xl font-bold text-gray-900">
                          PKR {cashFlowData.closingBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions" className="bg-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleOpenModal("in")}
                className="group flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <PlusCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Add Cash</p>
                    <p className="text-sm text-gray-600">
                      Record incoming cash
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">+</div>
              </button>

              <button
                onClick={() => handleOpenModal("out")}
                className="group flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-xl hover:from-red-100 hover:to-rose-100 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <MinusCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Remove Cash</p>
                    <p className="text-sm text-gray-600">
                      Record outgoing cash
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-600">-</div>
              </button>
            </div>
          </Card>

          {/* Import Sales Section */}
          <Card
            title="Import & Enter Sales"
            className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
            icon={<Upload className="w-6 h-6 text-purple-600" />}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Import from POS
                      </h3>
                      <p className="text-sm text-gray-600">
                        CSV or Excel files
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-colors">
                      Browse Files
                    </button>
                    <div className="text-xs text-gray-500">
                      Supports .csv, .xlsx up to 10MB
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Edit3 className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Manual Entry</h3>
                      <p className="text-sm text-gray-600">
                        Enter sales manually
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium">
                    Enter Sales Data
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today's Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900">
                      PKR {cashFlowData.todayTotal.toLocaleString()}
                    </p>
                  </div>
                  {/* <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    View Sales Report
                  </button> */}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Recent Transactions */}
        <div className="space-y-6">
          <Card
            title="Recent Transactions"
            className="bg-white shadow-lg"
            action={
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View All
              </button>
            }
          >
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "in"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "in" ? (
                        <PlusCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <MinusCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} />
                        {transaction.time} • {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      transaction.type === "in"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "in" ? "+" : "-"} PKR{" "}
                    {transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Daily Summary</div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    PKR{" "}
                    {(
                      cashFlowData.cashIn - cashFlowData.cashOut
                    ).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Net cash flow</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card
            title="Cash Flow Stats"
            className="bg-gradient-to-br from-gray-900 to-black text-white"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-300">Opening Balance</div>
                <div className="text-xl font-bold">
                  PKR {openingCash.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-300">Total Inflow</div>
                <div className="text-xl font-bold text-green-400">
                  + PKR {cashFlowData.cashIn.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-300">Total Outflow</div>
                <div className="text-xl font-bold text-red-400">
                  - PKR {cashFlowData.cashOut.toLocaleString()}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="text-gray-300">Projected Closing</div>
                  <div className="text-2xl font-bold">
                    PKR {cashFlowData.closingBalance.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Date Selector */}
          {/* <Card title="Select Date" className="bg-white">
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Today</div>
                  <div className="text-sm text-gray-600">December 15, 2024</div>
                </div>
              </div>
              <button className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Select Another Date
              </button>
            </div>
          </Card> */}
        </div>
      </div>

      {/* Cash Modal */}
      <CashModal
        open={open}
        onClose={() => setOpen(false)}
        type={cashType}
        openingBalance={openingCash}
      />
    </div>
  );
}
