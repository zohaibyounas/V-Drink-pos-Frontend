// components/CashModal.jsx
import React, { useState } from "react";
import { X, Plus, Minus, Calendar, FileText } from "lucide-react";

export default function CashModal({
  open,
  onClose,
  type = "in",
  openingBalance,
}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  if (!open) return null;

  const isCashIn = type === "in";
  const title = isCashIn ? "Add Cash In" : "Remove Cash Out";
  const icon = isCashIn ? Plus : Minus;
  const colorClass = isCashIn ? "text-green-600" : "text-red-600";
  const bgColorClass = isCashIn ? "bg-green-100" : "bg-red-100";

  const handleSubmit = () => {
    // Handle form submission
    console.log({ amount, description, date, type });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 ${bgColorClass} rounded-xl flex items-center justify-center`}
              >
                {React.createElement(icon, {
                  className: `w-6 h-6 ${colorClass}`,
                })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">
                  Record a cash transaction
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Current Balance */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">
              Current Opening Balance
            </div>
            <div className="text-2xl font-bold text-gray-900">
              PKR {openingBalance.toLocaleString()}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (PKR)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">PKR</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Date
                </div>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  Description
                </div>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for this transaction..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!amount}
              className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                isCashIn
                  ? "bg-green-600 hover:bg-green-700 disabled:bg-green-400"
                  : "bg-red-600 hover:bg-red-700 disabled:bg-red-400"
              } disabled:cursor-not-allowed`}
            >
              {isCashIn ? "Add Cash" : "Remove Cash"}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
