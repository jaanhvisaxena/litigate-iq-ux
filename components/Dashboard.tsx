"use client"

import { useState } from "react"
import { format } from "date-fns"
import { UserCircleIcon } from "@heroicons/react/24/solid"

// UI Components (Ensure these are correctly imported from your UI library or component directory)
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"

export default function Dashboard() {
  // State Variables
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date()
  )
  const [lawyerName, setLawyerName] = useState("Aaditya") // Replace with dynamic data from session/API
  const [events, setEvents] = useState<string[]>([
    // Placeholder events; replace with data from API
    "Client Meeting at 10:00 AM",
    "Court Hearing at 2:00 PM",
  ])
  const [notifications, setNotifications] = useState<any[]>([
    // Placeholder notifications; replace with data from API
    {
      timeAgo: "2 hours ago",
      title: "John Doe updated Case #1234",
      description: "Sent new documents to the client.",
    },
    {
      timeAgo: "5 hours ago",
      title: "Jane Smith created a new case",
      description: "New case for corporate litigation.",
    },
  ])

  // Sample data for the summary cards
  const totalCases = 120
  const pendingCases = 45
  const resolvedCases = 75
  const upcomingDeadlines = 8

  // State to track which card is selected
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  // Function to get the card title based on the selected card
  const getCardTitle = (card: string) => {
    switch (card) {
      case "total-cases":
        return "Total Cases"
      case "pending-cases":
        return "Pending Cases"
      case "resolved-cases":
        return "Resolved Cases"
      case "upcoming-deadlines":
        return "Upcoming Deadlines"
      default:
        return ""
    }
  }

  // Function to get sample data based on the selected card
    const getSampleData = (card: string) => {
        switch (card) {
            case "total-cases":
                return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <ul className="list-disc ml-5 space-y-2 text-gray-800">
                            <li>
                                <span className="font-semibold">Case #123:</span> Contract Dispute
                            </li>
                            <li>
                                <span className="font-semibold">Case #124:</span> Personal Injury
                            </li>
                            <li>
                                <span className="font-semibold">Case #125:</span> Intellectual Property
                            </li>
                            <li>
                                <span className="font-semibold">Case #126:</span> Employment Law
                            </li>
                            <li>
                                <span className="font-semibold">Case #127:</span> Real Estate Transaction
                            </li>
                        </ul>
                    </div>
                );

            case "pending-cases":
                return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <ul className="list-disc ml-5 space-y-2 text-gray-800">
                            <li>
                                <span className="font-semibold">Case #128:</span> Ongoing Litigation
                            </li>
                            <li>
                                <span className="font-semibold">Case #129:</span> Awaiting Court Date
                            </li>
                            <li>
                                <span className="font-semibold">Case #130:</span> Under Investigation
                            </li>
                            <li>
                                <span className="font-semibold">Case #131:</span> Document Review Pending
                            </li>
                        </ul>
                    </div>
                );

            case "resolved-cases":
                return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <ul className="list-disc ml-5 space-y-2 text-gray-800">
                            <li>
                                <span className="font-semibold">Case #120:</span> Won - Settlement Reached
                            </li>
                            <li>
                                <span className="font-semibold">Case #121:</span> Lost - Appeal Pending
                            </li>
                            <li>
                                <span className="font-semibold">Case #122:</span> Won - Verdict in Favor
                            </li>
                            <li>
                                <span className="font-semibold">Case #123:</span> Won - Dismissed by Court
                            </li>
                        </ul>
                    </div>
                );

            case "upcoming-deadlines":
                return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <ul className="list-disc ml-5 space-y-2 text-gray-800">
                            <li>
                                <span className="font-semibold">File motion for Case #132:</span> by Oct 25
                            </li>
                            <li>
                                <span className="font-semibold">Submit evidence for Case #133:</span> by Oct 28
                            </li>
                            <li>
                                <span className="font-semibold">Prepare witness statements:</span> by Nov 1
                            </li>
                            <li>
                                <span className="font-semibold">Client meeting for Case #134:</span> on Nov 3
                            </li>
                        </ul>
                    </div>
                );

            default:
                return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm text-center text-gray-500">
                        No data available.
                    </div>
                );
        }


  }

  return (
      <div className="space-y-8 p-6 bg-white min-h-screen">
        {/* Welcome Section */}
        <div className="flex items-center space-x-4">
          <UserCircleIcon className="w-16 h-16 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome, {lawyerName}!
          </h1>
        </div>

        {/* Calendar Section */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              Appointments and Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="bg-white rounded-lg p-4 shadow-md">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md"
                />
              </div>
              {/* Events List */}
              <div className="bg-white rounded-lg p-4 shadow-md md:col-span-2">
                <h3 className="font-semibold text-xl text-gray-700 mb-4">
                  Events on{" "}
                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </h3>
                <ul className="space-y-3">
                  {events.length > 0 ? (
                      events.map((event, index) => (
                          <li
                              key={index}
                              className="text-gray-600 flex items-center space-x-2"
                          >
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            <span>{event}</span>
                          </li>
                      ))
                  ) : (
                      <li className="text-gray-500">No events for this date.</li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card
              onClick={() =>
                  setSelectedCard(
                      selectedCard === "total-cases" ? null : "total-cases"
                  )
              }
              className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
                  selectedCard === "total-cases" ? "border-blue-600 border-2" : ""
              }`}
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-blue-600">
                {totalCases}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-600 font-semibold">+15</span> from last
                month
              </p>
            </CardContent>
          </Card>

          <Card
              onClick={() =>
                  setSelectedCard(
                      selectedCard === "pending-cases" ? null : "pending-cases"
                  )
              }
              className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
                  selectedCard === "pending-cases" ? "border-yellow-600 border-2" : ""
              }`}
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Pending Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-yellow-600">
                {pendingCases}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-red-600 font-semibold">-3</span> from last
                month
              </p>
            </CardContent>
          </Card>

          <Card
              onClick={() =>
                  setSelectedCard(
                      selectedCard === "resolved-cases" ? null : "resolved-cases"
                  )
              }
              className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
                  selectedCard === "resolved-cases" ? "border-green-600 border-2" : ""
              }`}
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Resolved Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-green-600">
                {resolvedCases}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-600 font-semibold">+18</span> from last
                month
              </p>
              <p className="text-sm text-gray-400 italic mt-1">
                Verify cases won details.
              </p>
            </CardContent>
          </Card>

          <Card
              onClick={() =>
                  setSelectedCard(
                      selectedCard === "upcoming-deadlines"
                          ? null
                          : "upcoming-deadlines"
                  )
              }
              className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
                  selectedCard === "upcoming-deadlines"
                      ? "border-red-600 border-2"
                      : ""
              }`}
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-red-600">
                {upcomingDeadlines}
              </div>
              <p className="text-sm text-gray-500 mt-2">Within next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Sample Data Display */}
        {selectedCard && (
            <div className="mt-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {getCardTitle(selectedCard)}
                  </CardTitle>
                </CardHeader>
                <CardContent>{getSampleData(selectedCard)}</CardContent>
              </Card>
            </div>
        )}

        {/* Notifications Section */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-6">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-md"
                        >
                          <Badge
                              variant="outline"
                              className="bg-gray-100 text-gray-800 px-3 py-1"
                          >
                            {notification.timeAgo}
                          </Badge>
                          <div>
                            <p className="text-lg font-semibold text-gray-700">
                              {notification.title}
                            </p>
                            <p className="text-gray-500 mt-1">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No notifications.</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
  )
}
