"use client"

import { useState } from "react"
import { format } from "date-fns"
import { UserCircleIcon } from "@heroicons/react/24/solid"

// UI Components (Ensure these are correctly imported from your UI library or component directory)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Dashboard() {
  // State Variables
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [lawyerName, setLawyerName] = useState("Aaditya") // Replace with dynamic data from session/API
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | undefined>()
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
  const [activeTab, setActiveTab] = useState("All Cases")

  // Function to handle lawyer selection
  const handleLawyerSelect = (value: string) => {
    setSelectedLawyerId(value)
    console.log("Selected Lawyer ID:", value)
  }

  // Function to handle associating hearing
  const handleAssociateHearing = () => {
    console.log("Hearing ID, Case ID submitted with Lawyer ID:", selectedLawyerId)
    // Implement API call here
  }

  return (
      <div className="space-y-8 p-6 bg-gray-50">
        {/* Welcome Section */}
        <div className="flex items-center space-x-4">
          <UserCircleIcon className="w-16 h-16 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {lawyerName}!</h1>
        </div>

        {/* Calendar and Hearing Association Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Appointments and Deadlines</CardTitle>
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
                <h3 className="font-semibold text-lg text-gray-700 mb-4">
                  Events on {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </h3>
                <ul className="list-disc ml-5 space-y-3">
                  {/* Replace with actual events fetched from an API */}
                  {events.length > 0 ? (
                      events.map((event, index) => (
                          <li key={index} className="text-gray-600">
                            {event}
                          </li>
                      ))
                  ) : (
                      <li className="text-gray-500">No events for this date.</li>
                  )}
                </ul>
              </div>
            </div>
            {/* Hearing Association */}
            <div className="mt-6 bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold text-lg text-gray-700 mb-4">Associate Hearing</h3>
              <div className="space-y-4">
                <Select onValueChange={handleLawyerSelect}>
                  <SelectTrigger className="w-full border rounded-md px-3 py-2">
                  <span>
                    {selectedLawyerId ? `Selected Lawyer ID: ${selectedLawyerId}` : "Select Lawyer"}
                  </span>
                  </SelectTrigger>
                  <SelectContent>
                    {/* Replace with dynamic lawyer list fetched from an API */}
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                    <SelectItem value="3">Aaditya</SelectItem>
                  </SelectContent>
                </Select>
                <button
                    onClick={handleAssociateHearing}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Associate Hearing
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="All Cases">All Cases</TabsTrigger>
              <TabsTrigger value="Pending Cases">Pending Cases</TabsTrigger>
              <TabsTrigger value="Resolved Cases">Resolved Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="All Cases">
              {/* Content for All Cases */}
              <p className="mt-4 text-gray-700">Display all cases here.</p>
            </TabsContent>
            <TabsContent value="Pending Cases">
              {/* Content for Pending Cases */}
              <p className="mt-4 text-gray-700">Display pending cases here.</p>
            </TabsContent>
            <TabsContent value="Resolved Cases">
              {/* Content for Resolved Cases */}
              <p className="mt-4 text-gray-700">Display resolved cases here.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-md transition-transform hover:scale-105">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">100</div>
              <p className="text-sm text-gray-500">+10 from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-md transition-transform hover:scale-105">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Pending Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">30</div>
              <p className="text-sm text-gray-500">-5 from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-md transition-transform hover:scale-105">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Resolved Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">70</div>
              <p className="text-sm text-gray-500">+15 from last month</p>
              <p className="text-sm text-gray-400 italic">Verify cases won details.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md transition-transform hover:scale-105">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">12</div>
              <p className="text-sm text-gray-500">Within next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-6">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="flex items-center">
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 px-3 py-1">
                            {notification.timeAgo}
                          </Badge>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-700">{notification.title}</p>
                            <p className="text-sm text-gray-500">{notification.description}</p>
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
