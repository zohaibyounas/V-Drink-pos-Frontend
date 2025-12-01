import React, { useEffect, useState } from "react";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Download,
  RefreshCw,
  BarChart3,
  Shield,
  Calculator,
  Clock,
  Filter,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Card from "../components/Card";
import { getTaxSummary } from "../utils/api";
import ExportButtons from "../components/ExportButtons";

export default function TaxOverview() {
  const [range, setRange] = useState({ from: "", to: "" });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly"); // monthly, quarterly, yearly

  const load = async () => {
    setLoading(true);
    try {
      const res = await getTaxSummary(range);
      setSummary(res.data);
    } catch (e) {
      // fallback demo data with more details
      setSummary({
        taxable: 250000,
        collected: 37500,
        reversed: 5000,
        previousMonth: {
          taxable: 220000,
          collected: 33000,
          reversed: 4000,
          payable: 29000,
        },
        quarterly: {
          taxable: 750000,
          collected: 112500,
          reversed: 15000,
          payable: 97500,
        },
        yearly: {
          taxable: 3000000,
          collected: 450000,
          reversed: 60000,
          payable: 390000,
        },
        breakdown: [
          { month: "Jan", taxable: 220000, collected: 33000, reversed: 3000 },
          { month: "Feb", taxable: 240000, collected: 36000, reversed: 4000 },
          { month: "Mar", taxable: 250000, collected: 37500, reversed: 5000 },
        ],
        status: "pending",
        dueDate: "2025-12-15",
        filingNumber: "F-2025-11-001",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const payable = (summary?.collected || 0) - (summary?.reversed || 0);

  // Calculate percentage changes
  const getPercentageChange = (current, previous) => {
    if (!previous || previous === 0) return null;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const taxableChange = summary?.previousMonth
    ? getPercentageChange(summary.taxable, summary.previousMonth.taxable)
    : null;
  const collectedChange = summary?.previousMonth
    ? getPercentageChange(summary.collected, summary.previousMonth.collected)
    : null;
  const reversedChange = summary?.previousMonth
    ? getPercentageChange(summary.reversed, summary.previousMonth.reversed)
    : null;

  const getTabData = () => {
    switch (activeTab) {
      case "quarterly":
        return summary?.quarterly || summary;
      case "yearly":
        return summary?.yearly || summary;
      default:
        return summary;
    }
  };

  const tabData = getTabData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tax Overview</h1>
            <p className="text-gray-600 mt-2">
              Manage and analyze your sales tax calculations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText size={18} />
              File Tax Return
            </button>
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Period Selector Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {["monthly", "quarterly", "yearly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Date Range
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={range.from}
                    onChange={(e) =>
                      setRange({ ...range, from: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={range.to}
                    onChange={(e) => setRange({ ...range, to: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={load}
              disabled={loading || !range.from || !range.to}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full lg:w-auto"
            >
              <Filter size={18} />
              Apply Filters
            </button>
          </div>
        </div>
      </Card>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Column - Tax Metrics */}
        <div className="space-y-6">
          {/* Taxable Sales */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Taxable Sales
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      PKR {(tabData?.taxable || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                {taxableChange && (
                  <div
                    className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm ${
                      parseFloat(taxableChange) >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {parseFloat(taxableChange) >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(parseFloat(taxableChange))}%
                    <span className="text-gray-600 ml-1">
                      vs previous period
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tax Collected & Reversed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">
                        Tax Collected
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        PKR {(tabData?.collected || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {collectedChange && (
                    <div
                      className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm ${
                        parseFloat(collectedChange) >= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {parseFloat(collectedChange) >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(parseFloat(collectedChange))}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-700">
                        Tax Reversed
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        PKR {(tabData?.reversed || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {reversedChange && (
                    <div
                      className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm ${
                        parseFloat(reversedChange) >= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {parseFloat(reversedChange) >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(parseFloat(reversedChange))}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tax Payable & Actions */}
        <div className="space-y-6">
          {/* Final Tax Payable */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 rounded-2xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-purple-200 mb-1">
                  Final Sales Tax Payable
                </p>
                <p className="text-4xl font-bold">
                  PKR {payable.toLocaleString()}
                </p>
                <p className="text-sm text-purple-200 mt-2">
                  Computed as <b>collected − reversed</b> (refunds)
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Calculator className="w-8 h-8" />
              </div>
            </div>

            {/* Filing Status */}
            {summary?.status && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-200">Filing Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          summary.status === "filed"
                            ? "bg-green-500 text-white"
                            : summary.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {summary.status === "filed" ? (
                          <CheckCircle size={14} />
                        ) : (
                          <AlertCircle size={14} />
                        )}
                        {summary.status.charAt(0).toUpperCase() +
                          summary.status.slice(1)}
                      </span>
                      {summary.filingNumber && (
                        <span className="text-sm text-purple-200">
                          {summary.filingNumber}
                        </span>
                      )}
                    </div>
                  </div>
                  {summary.dueDate && (
                    <div className="text-right">
                      <p className="text-sm text-purple-200">Due Date</p>
                      <p className="font-medium">
                        {new Date(summary.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Export Actions */}
          <Card title="Export & Reports">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Detailed Tax Report
                    </p>
                    <p className="text-sm text-gray-600">
                      Complete breakdown with calculations
                    </p>
                  </div>
                </div>
                <ExportButtons
                  summary={{ ...summary, payable }}
                  label="Export"
                  variant="icon"
                />
              </div>

              {/* <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex-1">
                  <BarChart3 size={18} />
                  View Analytics
                </button>
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex-1">
                  <Shield size={18} />
                  Tax Compliance
                </button>
              </div> */}
            </div>
          </Card>
        </div>
      </div>

      {/* Monthly Breakdown */}
      {summary?.breakdown && (
        <Card title="Monthly Breakdown" className="mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                    Month
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                    Taxable Sales
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                    Tax Collected
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                    Tax Reversed
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                    Net Tax
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {summary.breakdown.map((item, index) => {
                  const netTax = item.collected - item.reversed;
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.month}
                            </p>
                            <p className="text-sm text-gray-600">2025</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-lg font-semibold text-gray-900">
                          PKR {item.taxable.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-lg font-semibold text-green-600">
                          PKR {item.collected.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-lg font-semibold text-red-600">
                          PKR {item.reversed.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-xl font-bold text-gray-900">
                          PKR {netTax.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle size={12} />
                          Filed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tax Rate</p>
              <p className="text-2xl font-bold text-gray-900">15%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Monthly Tax</p>
              <p className="text-2xl font-bold text-gray-900">
                PKR{" "}
                {((tabData?.collected || 0) / 3).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Filing Due</p>
              <p className="text-2xl font-bold text-gray-900">Dec 15</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
