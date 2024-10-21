// components/UnifiedDashboardComponent.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"

// Import all the components
import Dashboard from "@/components/Dashboard"
import DocumentAnalysis from "@/components/DocumentAnalysis"
import CaseManagement from "@/components/CaseManagement"
import SentimentAnalysis from "@/components/SentimentAnalysis"
import PredictiveAnalytics from "@/components/PredictiveAnalytics"
import RiskAssessment from "@/components/RiskAssessment"
import RoleManagement from "@/components/RoleManagement"
import CaseDetailView from "@/components/CaseDetailView"
import LegalResearchTool from "@/components/LegalResearchTool"
import DocumentGeneration from "@/components/DocumentGeneration"
import UserFeedbackPage from "@/components/UserFeedbackPage"
import CommunicationModule from "@/components/CommunicationModule"
import { SettingsComponent } from "./Settings"

export default function UnifiedDashboardComponent() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "document-analysis":
        return <DocumentAnalysis />
      case "case-management":
        return <CaseManagement />
      case "sentiment-analysis":
        return <SentimentAnalysis />
      case "risk-assessment":
        return <RiskAssessment />
      case "role-management":
        return <RoleManagement />
      case "case-detail":
        return <CaseDetailView />
      case "legal-research":
        return <LegalResearchTool />
      case "document-generation":
        return <DocumentGeneration />
      case "user-feedback":
        return <UserFeedbackPage />
      case "communication":
        return <CommunicationModule />
      case "settings":
        return <SettingsComponent />
      default:
        return <div>Welcome to the Dashboard</div>
    }
  }

  return (
    <div className="flex h-screen bg-white">  {/* Ensure background is white */}
      {/* Sidebar for larger screens, hidden on mobile */}
      <div
        className={`fixed inset-0 z-30 w-64 bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:block`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">LitigateIQ</h1>
        </div>
        <nav className="mt-2 space-y-2">
          <Button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "dashboard"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => setActiveSection("case-detail")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "case-detail"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Case Detail
          </Button>
          <Button
            onClick={() => setActiveSection("case-management")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "case-management"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Case Management
          </Button>
          <Button
            onClick={() => setActiveSection("document-generation")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "document-generation"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Document Generation
          </Button>
          <Button
            onClick={() => setActiveSection("legal-research")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "legal-research"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Legal Research
          </Button>
          <Button
            onClick={() => setActiveSection("document-analysis")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "document-analysis"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Document Analysis
          </Button>
          <Button
            onClick={() => setActiveSection("sentiment-analysis")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "sentiment-analysis"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Sentiment Analysis
          </Button>
          <Button
            onClick={() => setActiveSection("risk-assessment")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "risk-assessment"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Risk Assessment
          </Button>
          <Button
            onClick={() => setActiveSection("role-management")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "role-management"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Role Management
          </Button>
          <Button
            onClick={() => setActiveSection("communication")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "communication"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Communication
          </Button>
          <Button
            onClick={() => setActiveSection("user-feedback")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "user-feedback"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            User Feedback
          </Button>
          <Button
            onClick={() => setActiveSection("settings")}
            className={`w-full justify-start px-4 py-3 text-left rounded-lg ${
              activeSection === "settings"
                ? "bg-gray-200 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Settings
          </Button>
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="outline" className="text-black border-black">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-white"> {/* Ensure background is white */}
        {/* Mobile Menu Button */}
        <div className="p-4 bg-white shadow-lg lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {activeSection
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h2>
          </header>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
