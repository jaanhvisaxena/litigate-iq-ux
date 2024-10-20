// components/CaseManagement.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart } from "@/components/ui/chart"
import { PlusCircle } from "lucide-react"

export default function CaseManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Management</CardTitle>
        <CardDescription>Manage your legal cases</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {[
            { id: 1, title: "Smith v. Jones", status: "Active", deadline: "2023-07-15" },
            { id: 2, title: "Johnson LLC Merger", status: "Pending", deadline: "2023-08-01" },
          ].map((case_) => (
            <div key={case_.id} className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold">{case_.title}</h3>
                <p className="text-sm text-muted-foreground">Status: {case_.status}</p>
                <p className="text-sm text-muted-foreground">Deadline: {case_.deadline}</p>
              </div>
              <Button>View Details</Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Case
        </Button>
      </CardFooter>
      <CardContent>
        <BarChart
          data={[
            { name: "Active", value: 10 },
            { name: "Pending", value: 5 },
            { name: "Closed", value: 8 },
          ]}
          config={{
            value: {
              label: "Cases",
              color: "#3b82f6",
            },
          }}
          className="h-[300px]"
        />
      </CardContent>
    </Card>
  )
}
