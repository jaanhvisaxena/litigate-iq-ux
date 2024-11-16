"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"
import { UserCircleIcon } from "@heroicons/react/24/solid" // Heroicons for the icon

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
      <div className="space-y-8 p-6 bg-gray-50">
        {/* Welcome Section */}
        <div className="flex items-center space-x-4">
          <UserCircleIcon className="w-16 h-16 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Aaditya!</h1>
        </div>

        {/* Calendar Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Appointments and Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-lg text-gray-700 mb-4">
                  Events on {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </h3>
                <ul className="list-disc ml-5 space-y-3">
                  {/* Replace with actual events */}
                  <li className="text-gray-600">Client Meeting at 10:00 AM</li>
                  <li className="text-gray-600">Court Hearing at 2:00 PM</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 px-3 py-1">
                    2 hours ago
                  </Badge>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-700">
                      John Doe updated Case #1234
                    </p>
                    <p className="text-sm text-gray-500">
                      Sent new documents to the client.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 px-3 py-1">
                    5 hours ago
                  </Badge>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-700">
                      Jane Smith created a new case
                    </p>
                    <p className="text-sm text-gray-500">
                      New case for corporate litigation.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
  )
}
