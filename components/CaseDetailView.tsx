// components/CaseDetailView.tsx
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Star, StarOff, Calendar as CalendarIcon } from "lucide-react"
import { LineChart } from "@/components/ui/chart"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function CaseDetailView() {
  const [notes, setNotes] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const handleAddNote = () => {
    // Implement note saving logic
    alert("Note added!")
    setNotes("")
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    alert(isFavorite ? "Case removed from favorites" : "Case added to favorites")
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Implement search logic
  }

  return (
      <div className="space-y-6 p-4 sm:p-6 bg-gray-50">
        {/* Search Bar */}
        <div className="flex items-center justify-between">
          <Input
              placeholder="Search cases..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="max-w-md"
          />
          <Button
              variant="ghost"
              onClick={handleFavoriteToggle}
              className="flex items-center space-x-2"
          >
            {isFavorite ? (
                <Star className="h-6 w-6 text-yellow-500" />
            ) : (
                <StarOff className="h-6 w-6 text-gray-400" />
            )}
            <span>{isFavorite ? "Unpin Case" : "Pin Case"}</span>
          </Button>
        </div>

        {/* Case Information */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <span>Case Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              <div>
                <Label className="text-gray-600">Client Name</Label>
                <p className="text-lg font-semibold">John Doe</p>
              </div>
              <div>
                <Label className="text-gray-600">Contact Information</Label>
                <p>Email: john.doe@example.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
              <div>
                <Label className="text-gray-600">Case Type</Label>
                <p>Civil Litigation</p>
              </div>
              <div>
                <Label className="text-gray-600">Description</Label>
                <p>Breach of contract dispute regarding property sale.</p>
              </div>
              <div>
                <Label className="text-gray-600">Assigned Lawyer/Team</Label>
                <p>Jane Smith, Senior Partner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Section */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <CalendarIcon className="h-6 w-6 text-green-500" />
              <span>Case Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <h3 className="font-semibold text-lg mb-4">
                  Events on{" "}
                  {selectedDate
                      ? format(selectedDate, "PPP")
                      : "Select a date"}
                </h3>
                <ul className="space-y-2">
                  {/* Replace with actual events */}
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Meeting
                    </Badge>
                    <span>Client Meeting at 10:00 AM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      Hearing
                    </Badge>
                    <span>Court Hearing at 2:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <FileText className="h-6 w-6 text-purple-500" />
              <span>Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {[
                { name: "Complaint.pdf", category: "Pleadings" },
                { name: "Contract_Agreement.pdf", category: "Contracts" },
                { name: "Email_Correspondence.eml", category: "Communications" },
                { name: "Evidence_Photos.zip", category: "Evidence" },
              ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      {doc.category}
                    </Badge>
                  </div>
              ))}
            </ScrollArea>
            <div className="mt-6">
              <Label htmlFor="document-upload" className="font-medium">
                Upload Document
              </Label>
              <div className="flex items-center space-x-4 mt-2">
                <Input id="document-upload" type="file" className="w-full" />
                <Button variant="outline" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <FileText className="h-6 w-6 text-orange-500" />
              <span>Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
                placeholder="Add a note..."
                value={notes}
                onChange={handleNoteChange}
                className="w-full"
            />
            <Button className="mt-4 w-full sm:w-auto" onClick={handleAddNote}>
              Add Note
            </Button>
            {/* Display existing notes */}
            <div className="mt-6">
              <Label className="font-medium">Existing Notes</Label>
              <ScrollArea className="h-[150px] mt-2">
                {[
                  {
                    content: "Discuss settlement options with client.",
                    date: "2023-03-15",
                  },
                  {
                    content:
                        "Review new evidence submitted by the opposing party.",
                    date: "2023-04-01",
                  },
                ].map((note, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-sm text-gray-500">{note.date}</p>
                      <p className="text-base">{note.content}</p>
                    </div>
                ))}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
