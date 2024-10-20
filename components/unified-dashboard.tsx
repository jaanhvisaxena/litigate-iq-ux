// components/UnifiedDashboardComponent.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

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
      case "predictive-analytics":
        return <PredictiveAnalytics />
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
        return <SettingsComponent/>

      default:
        return <div>Welcome to the Dashboard</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">LitigateIQ</h1>
        </div>
        <nav className="mt-4">
          {[
            { name: "Dashboard", key: "dashboard" },
            { name: "Case Detail", key: "case-detail" },
            { name: "Case Management", key: "case-management" },
            { name: "Document Generation", key: "document-generation" },
            { name: "Legal Research", key: "legal-research" },
            { name: "Document Analysis", key: "document-analysis" },
            { name: "Sentiment Analysis", key: "sentiment-analysis" },
            { name: "Predictive Analytics", key: "predictive-analytics" },
            { name: "Risk Assessment", key: "risk-assessment" },
            { name: "Role Management", key: "role-management" },
            { name: "Communication", key: "communication" },
            { name: "User Feedback", key: "user-feedback" },
            { name:"Settings", key:"settings"}
          ].map((item) => (
            <Button
              key={item.key}
              variant={activeSection === item.key ? "secondary" : "ghost"}
              className="w-full justify-start px-4 py-2 text-left"
              onClick={() => setActiveSection(item.key)}
            >
              {item.name}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
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
  )
}
