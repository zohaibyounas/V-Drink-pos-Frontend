import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  MoreVertical,
  PlusCircle,
  MinusCircle,
  Calendar,
  User,
  FileText,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Card from "../components/Card";

export default function CashLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [selectedLogs, setSelectedLogs] = useState([]);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setLogs([
        {
          id: 1,
          type: "in",
          amount: 15000,
          reason: "Cash sales deposit",
          description: "Daily cash collection from POS",
          user: "Ali Ahmed",
          userRole: "Cashier",
          timestamp: "2025-11-28T09:12:00Z",
          status: "completed",
          reference: "REF-001",
        },
        {
          id: 2,
          type: "out",
          amount: 4000,
          reason: "Bank deposit",
          description: "Deposit to HBL account",
          user: "Manager",
          userRole: "Manager",
          timestamp: "2025-11-28T12:00:00Z",
          status: "completed",
          reference: "REF-002",
        },
        {
          id: 3,
          type: "in",
          amount: 25000,
          reason: "Customer payment",
          description: "Advance payment from ABC Corp",
          user: "Sara Khan",
          userRole: "Sales Executive",
          timestamp: "2025-11-28T14:30:00Z",
          status: "completed",
          reference: "REF-003",
        },
        {
          id: 4,
          type: "out",
          amount: 8000,
          reason: "Petty cash",
          description: "Office supplies purchase",
          user: "Ahmed Raza",
          userRole: "Admin",
          timestamp: "2025-11-28T16:45:00Z",
          status: "pending",
          reference: "REF-004",
        },
        {
          id: 5,
          type: "in",
          amount: 12000,
          reason: "Online transfer",
          description: "Payment received via JazzCash",
          user: "Ali Ahmed",
          userRole: "Cashier",
          timestamp: "2025-11-27T10:15:00Z",
          status: "completed",
          reference: "REF-005",
        },
        {
          id: 6,
          type: "out",
          amount: 1500,
          reason: "Expense",
          description: "Team lunch expense",
          user: "Manager",
          userRole: "Manager",
          timestamp: "2025-11-27T13:20:00Z",
          status: "completed",
          reference: "REF-006",
        },
      ]);
    }, 500);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      search === "" ||
      log.reason.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.reference.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" || log.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalIn = logs
    .filter((l) => l.type === "in")
    .reduce((sum, l) => sum + l.amount, 0);
  const totalOut = logs
    .filter((l) => l.type === "out")
    .reduce((sum, l) => sum + l.amount, 0);
  const netCashFlow = totalIn - totalOut;

  const toggleSelectLog = (id) => {
    if (selectedLogs.includes(id)) {
      setSelectedLogs(selectedLogs.filter((logId) => logId !== id));
    } else {
      setSelectedLogs([...selectedLogs, id]);
    }
  };

  const selectAll = () => {
    if (selectedLogs.length === filteredLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(filteredLogs.map((log) => log.id));
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString("en-PK", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cash-logs-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cash Logs</h1>
            <p className="text-gray-600 mt-2">
              Track all cash transactions and their history
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download size={18} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 mb-1">Total Cash In</p>
              <p className="text-3xl font-bold text-gray-900">
                PKR {totalIn.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200">
            <div className="text-sm text-green-700">
              {logs.filter((l) => l.type === "in").length} transactions
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 mb-1">Total Cash Out</p>
              <p className="text-3xl font-bold text-gray-900">
                PKR {totalOut.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-red-200">
            <div className="text-sm text-red-700">
              {logs.filter((l) => l.type === "out").length} transactions
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 mb-1">Net Cash Flow</p>
              <p
                className={`text-3xl font-bold ${
                  netCashFlow >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {netCashFlow >= 0 ? "+" : "-"} PKR{" "}
                {Math.abs(netCashFlow).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="text-sm text-blue-700">
              {logs.length} total transactions
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions by reason, user, or reference..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="all">All Transactions</option>
              <option value="in">Cash In Only</option>
              <option value="out">Cash Out Only</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </Card>

      {/* Transaction Logs Table */}
      <Card title="Transaction History">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedLogs.length === filteredLogs.length &&
                      filteredLogs.length > 0
                    }
                    onChange={selectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedLogs.includes(log.id)}
                      onChange={() => toggleSelectLog(log.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          log.type === "in" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {log.type === "in" ? (
                          <PlusCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <MinusCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            log.type === "in"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {log.type === "in" ? "CASH IN" : "CASH OUT"}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {log.reference}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{log.reason}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {log.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div
                      className={`text-lg font-bold ${
                        log.type === "in" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {log.type === "in" ? "+" : "-"} PKR{" "}
                      {log.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{log.user}</p>
                        <p className="text-xs text-gray-500">{log.userRole}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {formatDate(log.timestamp)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        log.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {log.status === "completed" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="More Options"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No transactions found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {search
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Start by adding cash transactions to see them appear here."}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredLogs.length}</span>{" "}
              of <span className="font-medium">{logs.length}</span> transactions
              {search && (
                <span className="ml-2">
                  matching "<span className="font-medium">{search}</span>"
                </span>
              )}
            </div>

            {selectedLogs.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {selectedLogs.length} selected
                </span>
                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
