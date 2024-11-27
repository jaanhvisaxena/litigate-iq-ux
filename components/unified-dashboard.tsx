"use client";

import { useState } from "react";
import {
  Grid,
  FolderOpen,
  Search,
  MessageSquare,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Dashboard from "@/components/Dashboard";
import CaseManagement from "@/components/CaseManagement";
import LegalResearchTool from "@/components/LegalResearchTool";
import CommunicationModule from "@/components/CommunicationModule";
import SettingsComponent from "@/components/Settings";
import CaseDetailView from "@/components/CaseDetailView";

export default function UnifiedDashboardComponent() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard/>;
      case "case-management":
        return (
            <CaseManagement
                onCaseSelect={(id: number) => {
                  setSelectedCaseId(id);
                  setActiveSection("case-detail");
                }}
            />
        );
      case "case-detail":
        if (selectedCaseId) {
          return <CaseDetailView caseId={selectedCaseId}/>;
        }
        return <p>No case selected. Go back to Case Management.</p>;
      case "legal-research":
        return <LegalResearchTool/>;
      case "communication":
        return <CommunicationModule/>;
      case "settings":
        return <SettingsComponent/>;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  return (
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <aside
            className={`${
                isSidebarOpen ? "w-64" : "w-20"
            } flex flex-col bg-white border-r transition-all duration-300`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {isSidebarOpen && <h1 className="text-2xl font-bold text-gray-800">LitigateIQ</h1>}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-800"
                aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? (
                  <ChevronsLeft className="h-5 w-5"/>
              ) : (
                  <ChevronsRight className="h-5 w-5"/>
              )}
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-2">
              {[
                {label: "Dashboard", icon: Grid, section: "dashboard"},
                {label: "Case Management", icon: FolderOpen, section: "case-management"},
                {label: "Legal Research", icon: Search, section: "legal-research"},
                {label: "Communication", icon: MessageSquare, section: "communication"},
                {label: "Settings", icon: Settings, section: "settings"},
              ].map(({label, icon: Icon, section}) => (
                  <li key={section}>
                    <Button
                        onClick={() => setActiveSection(section)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                            activeSection === section
                                ? "bg-gray-200 text-black"
                                : "bg-white text-black hover:bg-gray-100"
                        }`}
                    >
                      <Icon className="h-5 w-5 mr-3"/>
                      {isSidebarOpen && label}
                    </Button>
                  </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
                variant="outline"
                className="text-black border-black w-full"
                onClick={() => alert("Logout clicked!")}
            >
              <LogOut className="mr-3 h-5 w-5"/>
              {isSidebarOpen && "Logout"}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 bg-white shadow sm:px-8">
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                className="sm:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Menu"
            >
              <Menu className="h-6 w-6"/>
            </Button>

            {/* Page Title */}
            <h2 className="flex-1 text-center text-xl font-bold text-gray-800 sm:text-left">
              {activeSection
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
            </h2>

            {/* Logout Button */}
            <Button
                variant="ghost"
                className="hidden sm:flex items-center"
                onClick={() => alert("Logout clicked!")}
            >
              <LogOut className="h-5 w-5 mr-2"/>
              Logout
            </Button>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
  );
}