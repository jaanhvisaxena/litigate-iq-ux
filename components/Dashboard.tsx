// components/Dashboard.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, LineChart, BarChart } from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  )

  const caseStatusData = [
    { name: "Pending", value: 30 },
    { name: "Resolved", value: 70 },
  ]

  const deadlineData = [
    { date: "2023-06-01", cases: 5 },
    { date: "2023-06-15", cases: 8 },
    { date: "2023-07-01", cases: 3 },
    { date: "2023-07-15", cases: 10 },
  ]

  const workloadData = [
    { name: "John Doe", cases: 15 },
    { name: "Jane Smith", cases: 12 },
    { name: "Bob Johnson", cases: 18 },
    { name: "Alice Brown", cases: 10 },
  ]

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">+10 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">-5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70</div>
            <p className="text-xs text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Within next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Case Overview and Upcoming Deadlines */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Case Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={caseStatusData}
              config={{
                pending: {
                  label: "Pending",
                  color: "hsl(var(--chart-1))",
                },
                resolved: {
                  label: "Resolved",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <p className="text-sm text-muted-foreground">Next 30 days</p>
          </CardHeader>
          <CardContent>
            <LineChart
              data={deadlineData}
              config={{
                cases: {
                  label: "Cases",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Team Workload */}
      <Card>
        <CardHeader>
          <CardTitle>Team Workload</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={workloadData}
            config={{
              cases: {
                label: "Cases",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          />
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              <div className="flex items-center">
                <Badge>2 hours ago</Badge>
                <div className="ml-4">
                  <p className="text-sm font-medium">John Doe updated Case #1234</p>
                  <p className="text-sm text-muted-foreground">Sent new documents to the client.</p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge>5 hours ago</Badge>
                <div className="ml-4">
                  <p className="text-sm font-medium">Jane Smith created a new case</p>
                  <p className="text-sm text-muted-foreground">New case for corporate litigation.</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments and Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Calendar */}
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md"
              />
            </div>
            {/* Events List */}
            <div>
              <h3 className="font-semibold mb-2">
                Events on {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
              </h3>
              <ul className="list-disc ml-5 space-y-2">
                {/* Replace with actual events */}
                <li>Client Meeting at 10:00 AM</li>
                <li>Court Hearing at 2:00 PM</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}