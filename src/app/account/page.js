"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  UserCircle, 
  ClipboardList, 
  Shield, 
  CreditCard, 
  Trash2,
  CalendarClock,
  // NEW ICON for mobile dropdown
  ChevronDown
} from 'lucide-react';

// Assuming these components are in the specified path
import ProfileDetails from "../components/dashboard/ProfileDetails";
import MyTasks from "../components/dashboard/MyTasks";
import AccountSecurity from "../components/dashboard/AccountSecurity";
import BillingInfo from "../components/dashboard/BillingInfo";
import DeleteAccount from "../components/dashboard/DeleteAccount";

export default function Account() {
  const { data: session, status } = useSession();

  // Navigation items configuration
  const navItems = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "tasks", label: "My Tasks", icon: ClipboardList },
    { id: "security", label: "Account Security", icon: Shield },
    { id: "billing", label: "Billing Info", icon: CreditCard },
    { id: "delete", label: "Delete Account", icon: Trash2, isDanger: true },
  ];

  // Initialize state from sessionStorage on the client, or use a default
  const [activePage, setActivePage] = useState(() => {
    // Default to the first item (profile) if no session or saved state exists
    const defaultPage = navItems[0].id;
    if (typeof window !== 'undefined') {
      const savedPage = sessionStorage.getItem("activePage");
      return savedPage || defaultPage;
    }
    return defaultPage; 
  });

  // Save the active page to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("activePage", activePage);
  }, [activePage]);

  // Renders the correct component based on the activePage state
  const renderActivePage = () => {
    switch (activePage) {
      case "profile":
        // 💡 NOTE: ProfileDetails is where you would update fields like bio, rate, etc.
        return <ProfileDetails session={session} />;
      case "tasks":
        return <MyTasks session={session} />;
      case "security":
        return <AccountSecurity session={session} />;
      case "billing":
        return <BillingInfo session={session} />;
      case "delete":
        return <DeleteAccount session={session} />;
      default:
        return <ProfileDetails session={session} />;
    }
  };
  
  // Display a loading state while session is being fetched
  if (status === "loading") {
    return <p className="text-center p-8 text-lg font-medium text-slate-700">Loading dashboard...</p>;
  }

  // Find the label for the currently active page (for mobile heading)
  const activeLabel = navItems.find(item => item.id === activePage)?.label || 'Settings';

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, {session?.user?.firstName || 'User'}
          </h1>
          <p className="text-slate-500 mt-1">Manage your profile, tasks, and account settings.</p>
        </header>

        {/* Mobile Navigation Dropdown (Visible on small screens: lg:hidden) */}
        <div className="lg:hidden mb-6">
            <label htmlFor="mobile-nav" className="block text-sm font-medium text-slate-700 mb-1">
                Active Section:
            </label>
            <div className="relative">
                <select
                    id="mobile-nav"
                    value={activePage}
                    onChange={(e) => setActivePage(e.target.value)}
                    className="appearance-none w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-4 pr-10 text-base font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {navItems.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column (Navigation - Hidden on small screens: hidden lg:block) */}
          <aside className="hidden lg:col-span-1 lg:block space-y-6">
            
            {/* Sidebar Navigation */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  
                  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer";
                  
                  // Active class uses a prominent indigo color
                  const activeClasses = item.isDanger 
                    ? "bg-red-50 text-red-700 border border-red-200" 
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200"; 
                  
                  const inactiveClasses = item.isDanger
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600";

                  const linkClasses = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

                  return (
                    <a key={item.id} onClick={() => setActivePage(item.id)} className={linkClasses}>
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
            
            {/* Availability Card (Enhanced Design) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                    <CalendarClock size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-md font-bold text-slate-800">Availability</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Set your weekly hours to get booked for tasks.</p>
                </div>
              </div>
              <button className="mt-4 w-full px-4 py-2 rounded-xl border-2 border-indigo-500 text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition">
                Manage Schedule
              </button>
            </div>
          </aside>
          
          {/* Right Column (Main Content) */}
          <main className="lg:col-span-3">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100">
                {/* Current Page Heading */}
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
                    {activeLabel}
                </h2>
                {/* Active Component Render */}
                {renderActivePage()}
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}