// components/CaseDetailView.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText } from "lucide-react"
import { LineChart } from "@/components/ui/chart"

export default function CaseDetailView() {
  const [notes, setNotes] = useState("")

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const handleAddNote = () => {
    // Implement note saving logic
    alert("Note added!")
    setNotes("")
  }

  return (
    <div className="space-y-4 p-4 sm:p-2">
      {/* Case Information */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <div>
              <Label>Client Name</Label>
              <p>John Doe</p>
            </div>
            <div>
              <Label>Contact Information</Label>
              <p>Email: john.doe@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <Label>Case Type</Label>
              <p>Civil Litigation</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>Breach of contract dispute regarding property sale.</p>
            </div>
            <div>
              <Label>Assigned Lawyer/Team</Label>
              <p>Jane Smith, Senior Partner</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={[
              { date: "2023-01-15", event: "Case Filed" },
              { date: "2023-02-01", event: "Initial Hearing" },
              { date: "2023-03-10", event: "Discovery Phase" },
              { date: "2023-04-20", event: "Settlement Talks" },
              { date: "2023-05-30", event: "Trial Date" },
            ]}
            config={{
              event: {
                label: "Events",
                color: "#3b82f6",
              },
            }}
            className="h-[300px] w-full"
          />
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {[
              { name: "Complaint.pdf", category: "Pleadings" },
              { name: "Contract_Agreement.pdf", category: "Contracts" },
              { name: "Email_Correspondence.eml", category: "Communications" },
              { name: "Evidence_Photos.zip", category: "Evidence" },
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{doc.name}</span>
                </div>
                <Badge>{doc.category}</Badge>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4">
            <Label htmlFor="document-upload">Upload Document</Label>
            <Input id="document-upload" type="file" className="w-full" />
            <Button variant="outline" className="mt-2 w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add a note..."
            value={notes}
            onChange={handleNoteChange}
            className="w-full"
          />
          <Button className="mt-2 w-full sm:w-auto" onClick={handleAddNote}>
            Add Note
          </Button>
          {/* Display existing notes */}
          <div className="mt-4">
            <Label>Existing Notes</Label>
            <ScrollArea className="h-[150px]">
              {[
                { content: "Discuss settlement options with client.", date: "2023-03-15" },
                { content: "Review new evidence submitted by the opposing party.", date: "2023-04-01" },
              ].map((note, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm text-muted-foreground">{note.date}</p>
                  <p>{note.content}</p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
