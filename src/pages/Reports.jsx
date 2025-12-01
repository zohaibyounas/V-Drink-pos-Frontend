import React, { useState } from "react";
import {
  FileText,
  Download,
  FileSpreadsheet,
  FilePieChart,
  Calendar,
  TrendingUp,
  DollarSign,
  Receipt,
  Shield,
  BarChart3,
  Filter,
  ChevronDown,
  Eye,
  Printer,
  Mail,
  CheckCircle,
} from "lucide-react";
import Card from "../components/Card";
import ExportButtons from "../components/ExportButtons";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("daily");
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  // Sample reports data
  const reports = {
    daily: {
      title: "Daily Cash Summary Report",
      icon: FileText,
      description: "Daily cash flow, opening/closing balance, and transactions",
      data: {
        date: new Date().toLocaleDateString("en-PK", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        openingCash: 100000,
        totalSales: 42000,
        cashAdded: 15000,
        cashRemoved: 4000,
        closingBalance: 111000,
        transactions: 24,
        status: "Ready",
      },
    },
    tax: {
      title: "Tax Summary Report",
      icon: Receipt,
      description: "Taxable sales, collected tax, reversals, and net payable",
      data: {
        period: "November 2025",
        taxableSales: 250000,
        taxCollected: 37500,
        taxReversed: 5000,
        finalPayable: 32500,
        taxRate: "15%",
        status: "Pending Filing",
      },
    },
    monthly: {
      title: "Monthly Performance Report",
      icon: BarChart3,
      description: "Monthly sales, expenses, and profit analysis",
      data: {
        month: "November 2025",
        totalSales: 1500000,
        totalExpenses: 850000,
        netProfit: 650000,
        growth: "+12.5%",
        status: "Generated",
      },
    },
    compliance: {
      title: "Tax Compliance Report",
      icon: Shield,
      description: "Filing status, due dates, and compliance checklist",
      data: {
        period: "Q4 2025",
        status: "Compliant",
        filingsDue: 1,
        lastFiled: "2025-10-15",
        nextDue: "2025-12-15",
        rating: "A",
      },
    },
  };

  const reportTypes = [
    { id: "daily", name: "Daily Cash", icon: FileText, color: "blue" },
    { id: "tax", name: "Tax Summary", icon: Receipt, color: "green" },
    { id: "monthly", name: "Monthly", icon: BarChart3, color: "purple" },
    { id: "compliance", name: "Compliance", icon: Shield, color: "orange" },
  ];

  const currentReport = reports[selectedReport];

  const handleGenerateReport = () => {
    // This would typically call an API
    console.log("Generating report:", selectedReport, dateRange);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    // Email functionality
    console.log("Emailing report...");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Generate and export financial reports for accounting
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Printer size={18} />
              Print
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Report Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selector */}
          <Card title="Select Report Type">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReport(type.id)}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      selectedReport === type.id
                        ? `border-${type.color}-500 bg-${type.color}-50`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                        selectedReport === type.id
                          ? `bg-${type.color}-100`
                          : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          selectedReport === type.id
                            ? `text-${type.color}-600`
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <span className="font-medium text-gray-900">
                      {type.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">Report</span>
                  </button>
                );
              })}
            </div>

            {/* Date Range Selector */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Select Date Range
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleGenerateReport}
                className="mt-4 w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <FileText size={18} />
                Generate Report
              </button>
            </div>
          </Card>

          {/* Report Preview */}
          <Card title="Report Preview">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentReport.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {currentReport.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle size={14} />
                  {currentReport.data.status}
                </span>
              </div>

              {/* Report Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(currentReport.data).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {typeof value === "number" && !key.includes("growth")
                        ? `PKR ${value.toLocaleString()}`
                        : typeof value === "number" && key.includes("growth")
                        ? `${value}`
                        : value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Actions */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye size={18} />
                    Preview Full Report
                  </button>
                  <button
                    onClick={handleEmail}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Mail size={18} />
                    Email Report
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Export Options */}
        <div className="space-y-6">
          {/* Export Card */}
          <Card
            title="Export Report"
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
          >
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ready to Download
                </h3>
                <p className="text-sm text-gray-600">
                  Export your report in multiple formats
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Excel (XLSX)</p>
                      <p className="text-xs text-gray-500">For data analysis</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">PDF Document</p>
                      <p className="text-xs text-gray-500">
                        For printing & sharing
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FilePieChart className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">CSV Data</p>
                      <p className="text-xs text-gray-500">
                        For import to other systems
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>

              <div className="pt-4 border-t border-blue-200">
                <ExportButtons
                  summary={currentReport.data}
                  label={`${selectedReport}_report_${
                    new Date().toISOString().split("T")[0]
                  }`}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Recent Reports */}
          <Card title="Recent Reports">
            <div className="space-y-3">
              {[
                { name: "Daily Cash Report", date: "Today", format: "PDF" },
                { name: "Tax Summary", date: "Yesterday", format: "Excel" },
                { name: "Monthly Analysis", date: "Nov 28", format: "PDF" },
                { name: "Compliance Check", date: "Nov 27", format: "CSV" },
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {report.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {report.date} • {report.format}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
              View All Reports
            </button>
          </Card>

          {/* Quick Stats */}
          <Card title="Report Stats" className="bg-gray-900 text-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-300">Reports Generated</div>
                <div className="text-2xl font-bold">142</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-300">This Month</div>
                <div className="text-xl font-bold text-green-400">24</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-300">Most Used Format</div>
                <div className="text-xl font-bold">PDF</div>
              </div>
              <div className="pt-4 border-t border-gray-800">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Last generated</div>
                  <div className="font-medium">Today, 10:30 AM</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
