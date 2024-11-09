// components/CommunicationModule.tsx
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, FileText, CalendarDays } from "lucide-react"

export default function CommunicationModule() {
  const [activeTab, setActiveTab] = useState("personal")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", content: "Hello, how's the case going?" },
    { id: 2, sender: "You", content: "We're making good progress." },
  ])
  const [groupMessages, setGroupMessages] = useState([
    { id: 1, sender: "Jane Smith", content: "Don't forget the meeting tomorrow." },
    { id: 2, sender: "Bob Johnson", content: "Got it! See you all at 10 AM." },
  ])
  const [tasks, setTasks] = useState([
    { id: 1, task: "Review case documents", assignedTo: "Jane Smith", dueDate: "2024-10-25" },
    { id: 2, task: "Prepare for deposition", assignedTo: "Bob Johnson", dueDate: "2024-10-30" },
  ])
  const [files, setFiles] = useState([
    { id: 1, name: "Contract_A.pdf", uploadedBy: "John Doe" },
    { id: 2, name: "Legal_Document.docx", uploadedBy: "Jane Smith" },
  ])
  const [notes, setNotes] = useState([
    { id: 1, content: "Meeting with client scheduled for next week.", author: "John Doe" },
    { id: 2, content: "Need to review new documents before the hearing.", author: "Jane Smith" },
  ])
  const [newTask, setNewTask] = useState("")
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newNote, setNewNote] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return
    if (activeTab === "personal") {
      setMessages([...messages, { id: messages.length + 1, sender: "You", content: newMessage }])
    } else {
      setGroupMessages([...groupMessages, { id: groupMessages.length + 1, sender: "You", content: newMessage }])
    }
    setNewMessage("")
  }

  const handleAddTask = () => {
    if (newTask.trim() === "") return
    setTasks([...tasks, { id: tasks.length + 1, task: newTask, assignedTo: "Unassigned", dueDate: "TBD" }])
    setNewTask("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0]
      setFiles([...files, { id: files.length + 1, name: uploadedFile.name, uploadedBy: "You" }])
      setNewFile(null)
    }
  }

  const handleAddNote = () => {
    if (newNote.trim() === "") return
    setNotes([...notes, { id: notes.length + 1, content: newNote, author: "You" }])
    setNewNote("")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Communication Module</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
            <TabsList>
              <TabsTrigger value="personal">
                <MessageSquare className="mr-2 h-4 w-4" />
                Personal DMs
              </TabsTrigger>
              <TabsTrigger value="groups">
                <Users className="mr-2 h-4 w-4" />
                Group Chats
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <div className="grid grid-cols-3 gap-4">
                {/* Conversations List */}
                <ScrollArea className="col-span-1 h-[400px] border rounded-md p-2">
                  {["John Doe", "Jane Smith", "Bob Johnson"].map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => setNewMessage(contact)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/avatars/${index + 1}.png`} alt={contact} />
                        <AvatarFallback>{contact.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{contact}</span>
                    </div>
                  ))}
                </ScrollArea>
                {/* Chat Window */}
                <div className="col-span-2 flex flex-col">
                  <ScrollArea className="flex-1 h-[400px] border rounded-md p-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`mb-4 ${msg.sender === "You" ? "text-right" : ""}`}>
                        <span className="font-semibold">{msg.sender}: </span>
                        <span>{msg.content}</span>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="mt-2 flex items-center space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="groups">
              <div className="grid grid-cols-3 gap-4">
                {/* Groups List */}
                <ScrollArea className="col-span-1 h-[400px] border rounded-md p-2">
                  {["Team A", "Project X", "Legal Department"].map((group, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => setNewMessage(group)}
                    >
                      <Users className="h-6 w-6 text-muted-foreground" />
                      <span>{group}</span>
                    </div>
                  ))}
                </ScrollArea>
                {/* Group Chat Window */}
                <div className="col-span-2 flex flex-col">
                  <ScrollArea className="flex-1 h-[400px] border rounded-md p-4">
                    {groupMessages.map((msg) => (
                      <div key={msg.id} className={`mb-4 ${msg.sender === "You" ? "text-right" : ""}`}>
                        <span className="font-semibold">{msg.sender}: </span>
                        <span>{msg.content}</span>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="mt-2 flex items-center space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Task Assignment Section */}
      <Card>
        <CardHeader>
          <CardTitle>Task Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-[200px] border rounded-md p-4">
              {tasks.map((task) => (
                <div key={task.id} className="mb-2">
                  <p className="font-semibold">{task.task}</p>
                  <p className="text-sm text-muted-foreground">Assigned to: {task.assignedTo}</p>
                  <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Sharing Section */}
      <Card>
        <CardHeader>
          <CardTitle>File Sharing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-[200px] border rounded-md p-4">
              {files.map((file) => (
                <div key={file.id} className="mb-2">
                  <FileText className="mr-2 inline h-4 w-4" />
                  <span>{file.name}</span> - <span className="text-sm text-muted-foreground">Uploaded by {file.uploadedBy}</span>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center space-x-2">
              <Input type="file" onChange={handleFileUpload} className="flex-1" />
              <Button>Upload File</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collaborative Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle>Collaborative Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-[200px] border rounded-md p-4">
              {notes.map((note) => (
                <div key={note.id} className="mb-2">
                  <p>{note.content}</p>
                  <p className="text-sm text-muted-foreground">- {note.author}</p>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center space-x-2">
              <Textarea
                placeholder="Add a new note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddNote}>Add Note</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
