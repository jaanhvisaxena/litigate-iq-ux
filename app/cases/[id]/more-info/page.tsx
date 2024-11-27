"use client";

import { useParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, FileText } from "lucide-react";

export default function CaseMoreInfoPage() {
    const params = useParams();
    const id = params?.id;

    // Example case data
    const caseDetails = {
        id: id,
        title: "Smith v. Jones",
        clientName: "John Doe",
        opposingParty: "Jane Jones",
        caseType: "Civil Litigation",
        description:
            "This case involves a breach of contract dispute regarding property sale. The client alleges that the opposing party failed to honor the terms of the agreement.",
        assignedLawyer: "Jane Smith, Senior Partner",
        status: "Active",
        timeline: [
            { date: "2023-01-15", event: "Case Filed" },
            { date: "2023-02-01", event: "Initial Hearing Scheduled" },
            { date: "2023-03-01", event: "Evidence Submission Deadline" },
            { date: "2023-04-10", event: "Pre-Trial Conference" },
        ],
        documents: [
            { name: "Complaint.pdf", category: "Pleadings", url: "#" },
            { name: "Contract_Agreement.pdf", category: "Contracts", url: "#" },
            { name: "Photos.zip", category: "Evidence", url: "#" },
        ],
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Full Information for Case: {caseDetails.title}
            </h1>

            {/* Case Details Section */}
            <Card className="shadow-lg border border-gray-200">
                <CardHeader className="bg-gray-50">
                    <CardTitle className="text-xl">Case Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                        <div>
                            <p className="font-medium text-gray-600">Client Name</p>
                            <p>{caseDetails.clientName}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600">Opposing Party</p>
                            <p>{caseDetails.opposingParty}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600">Case Type</p>
                            <p>{caseDetails.caseType}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600">Status</p>
                            <Badge className="text-sm bg-green-100 text-green-600">
                                {caseDetails.status}
                            </Badge>
                        </div>
                        <div className="sm:col-span-2">
                            <p className="font-medium text-gray-600">Description</p>
                            <p>{caseDetails.description}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600">Assigned Lawyer</p>
                            <p>{caseDetails.assignedLawyer}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Timeline Section */}
            <Card className="shadow-lg border border-gray-200">
                <CardHeader className="bg-gray-50">
                    <CardTitle className="text-xl">Case Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px]">
                        {caseDetails.timeline.map((event, index) => (
                            <div key={index} className="flex items-center space-x-4 mb-4">
                                <Clock className="text-gray-500" />
                                <div>
                                    <p className="font-medium text-gray-800">{event.event}</p>
                                    <p className="text-sm text-gray-600">{event.date}</p>
                                </div>
                            </div>
                        ))}

                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Documents Section */}
            <Card className="shadow-lg border border-gray-200">
                <CardHeader className="bg-gray-50">
                    <CardTitle className="text-xl">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px]">
                        {caseDetails.documents.map((doc, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between mb-4"
                            >
                                <div className="flex items-center space-x-3">
                                    <FileText className="text-gray-500" />
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {doc.name}
                                    </a>
                                </div>
                                <Badge className="text-sm bg-gray-100 text-gray-600">
                                    {doc.category}
                                </Badge>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
