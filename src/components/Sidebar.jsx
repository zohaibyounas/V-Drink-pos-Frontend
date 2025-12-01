import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Wallet,
  FileText,
  Receipt,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
} from "lucide-react";

// Import the logo - make sure the path is correct
import logo from "../assets/logo.png"; // Adjust the path based on your folder structure

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/cash", label: "Cash", icon: Wallet },
    { to: "/logs", label: "Logs", icon: FileText },
    { to: "/tax", label: "Tax", icon: Receipt },
    { to: "/reports", label: "Reports", icon: BarChart3 },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${
       isActive
         ? "bg-purple-50 text-purple-600 border-l-4 border-purple-500"
         : "text-gray-700 hover:bg-gray-50 hover:text-purple-500"
     }`;

  const collapsedLinkClass = ({ isActive }) =>
    `flex items-center justify-center p-3 rounded-lg transition-all duration-200
     ${
       isActive
         ? "bg-purple-50 text-purple-600"
         : "text-gray-700 hover:bg-gray-50 hover:text-purple-500"
     }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container - Sticky with scrolling content */}
      <aside
        className={`
        fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col h-screen bg-white border-r border-gray-200
        ${open ? "w-64" : "w-20"}
      `}
      >
        {/* Logo Section - Fixed at top */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {open ? (
            <div className="flex items-center justify-center w-full">
              {/* Logo Image */}
              <div className="w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                <img
                  src={logo}
                  alt="V-Drink Logo"
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
                        V
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg overflow-hidden mx-auto flex items-center justify-center bg-white">
              <img
                src={logo}
                alt="V-Drink Logo"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                      V
                    </div>
                  `;
                }}
              />
            </div>
          )}

          {/* Toggle Button for Desktop */}
          <button
            onClick={() => setOpen(!open)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg 
              hover:bg-gray-100 text-gray-600"
            title={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Profile Section - Fixed below logo */}
        {open ? (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 border-b border-gray-200 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        )}

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return open ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={() => setIsMobileOpen(false)}
                  title={item.label}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={collapsedLinkClass}
                  title={item.label}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon size={20} />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {open ? (
            <>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
                title="Settings"
              >
                <Settings size={20} />
                <span className="font-medium">Settings</span>
              </NavLink>
              <button
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg 
                text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-all duration-200"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center justify-center p-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
                title="Settings"
              >
                <Settings size={20} />
              </NavLink>
              <button
                className="flex items-center justify-center w-full p-3 rounded-lg 
                text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-all duration-200"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Menu Button - Only shows on mobile */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 w-10 h-10 bg-white rounded-lg 
          shadow-md flex items-center justify-center text-gray-700"
        title="Open menu"
      >
        <Menu size={20} />
      </button>
    </>
  );
}
