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
import {
  Upload,
  FileText,
  Star,
  StarOff,
  Calendar as CalendarIcon,
  Loader2,
  Search,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Toaster, toast } from "react-hot-toast"

export default function CaseDetailView() {
  // State Variables
  const [notes, setNotes] = useState("")
  const [notesList, setNotesList] = useState([
    {
      content: "Discuss settlement options with client.",
      date: "2023-03-15",
    },
    {
      content: "Review new evidence submitted by the opposing party.",
      date: "2023-04-01",
    },
  ])
  const [isFavorite, setIsFavorite] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [documents, setDocuments] = useState([
    {
      name: "Complaint.pdf",
      category: "Pleadings",
      url: "#",
    },
    {
      name: "Contract_Agreement.pdf",
      category: "Contracts",
      url: "#",
    },
    {
      name: "Email_Correspondence.eml",
      category: "Communications",
      url: "#",
    },
    {
      name: "Evidence_Photos.zip",
      category: "Evidence",
      url: "#",
    },
  ])

  // Handlers
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const handleAddNote = () => {
    if (notes.trim() === "") {
      toast.error("Please enter a note.")
      return
    }
    const newNote = {
      content: notes,
      date: format(new Date(), "yyyy-MM-dd"),
    }
    setNotesList((prevNotes) => [newNote, ...prevNotes])
    setNotes("")
    toast.success("Note added successfully!")
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    toast(
        isFavorite ? "Case removed from favorites" : "Case added to favorites",
        {
          icon: isFavorite ? <StarOff className="text-gray-400" /> : <Star className="text-yellow-500" />,
        }
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Implement search logic
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.")
      return
    }
    setUploading(true)
    try {
      // Simulate file upload and URL generation
      const uploadedFileUrl = await uploadFile(selectedFile)
      setDocuments((prevDocuments) => [
        ...prevDocuments,
        {
          name: selectedFile.name,
          category: "Uncategorized",
          url: uploadedFileUrl,
        },
      ])
      setSelectedFile(null)
      toast.success("File uploaded successfully!")
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("Failed to upload file.")
    } finally {
      setUploading(false)
    }
  }

  const uploadFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate a delay for file upload
      setTimeout(() => {
        // Simulate generating a file URL
        const fileUrl = URL.createObjectURL(file)
        resolve(fileUrl)
      }, 2000)
    })
  }

  const handleMoreInfo = () => {
    // Implement navigation to detailed view
    toast("Navigating to more information...", { icon: "ℹ️" })
  }

  return (
      <div className="space-y-6 p-4 sm:p-6 bg-white">
        <Toaster position="top-right" reverseOrder={false} />
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/2">
            <Input
                placeholder="Search cases..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button
              variant="outline"
              onClick={handleFavoriteToggle}
              className="flex items-center space-x-2"
          >
            {isFavorite ? (
                <>
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Unpin Case</span>
                </>
            ) : (
                <>
                  <StarOff className="h-5 w-5 text-gray-500" />
                  <span>Pin Case</span>
                </>
            )}
          </Button>
        </div>

        {/* Case Information */}
        <Card className="w-full shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-50">
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
                <p>
                  Breach of contract dispute regarding property sale. The client
                  alleges that the opposing party failed to honor the terms of the
                  agreement.
                </p>
              </div>
              <div>
                <Label className="text-gray-600">Assigned Lawyer/Team</Label>
                <p>Jane Smith, Senior Partner</p>
              </div>
            </div>
            <div className="mt-6">
              <Button
                  className="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all"
                  onClick={handleMoreInfo}
              >
                More Information
              </Button>

            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="w-full shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-50">
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
            <Button
                className="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddNote}
            >
              Add Note
            </Button>
            {/* Display existing notes */}
            <div className="mt-6">
              <Label className="font-medium">Existing Notes</Label>
              <ScrollArea className="h-[150px] mt-2">
                {notesList.length > 0 ? (
                    notesList.map((note, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-sm text-gray-500">{note.date}</p>
                          <p className="text-base">{note.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No notes available.</p>
                )}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Section */}
        <Card className="w-full shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-50">
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
                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </h3>
                <ul className="space-y-2">
                  {/* Replace with actual events */}
                  <li className="flex items-center space-x-2">
                    <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800"
                    >
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
        <Card className="w-full shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl flex items-center space-x-2">
              <FileText className="h-6 w-6 text-purple-500" />
              <span>Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {documents.length > 0 ? (
                  documents.map((doc, index) => (
                      <div
                          key={index}
                          className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                          >
                            {doc.name}
                          </a>
                        </div>
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                          {doc.category}
                        </Badge>
                      </div>
                  ))
              ) : (
                  <p className="text-sm text-gray-500">No documents uploaded.</p>
              )}
            </ScrollArea>
            <div className="mt-6">
              <Label htmlFor="document-upload" className="font-medium">
                Upload Document
              </Label>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
                <Input
                    id="document-upload"
                    type="file"
                    className="w-full"
                    onChange={handleFileSelect}
                />
                <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={handleUpload}
                    disabled={uploading}
                >
                  {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                  ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
