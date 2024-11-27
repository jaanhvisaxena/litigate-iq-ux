// components/CaseManagement.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Star, StarOff, Search } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";

interface CaseManagementProps {
    onCaseSelect: (id: number) => void;
}

export default function CaseManagement({ onCaseSelect }: CaseManagementProps) {
    const router = useRouter();

    // State for cases
    const [cases, setCases] = useState([
        {
            id: 1,
            title: "Smith v. Jones",
            status: "Active",
            deadline: "2023-07-15",
            isPinned: false,
        },
        {
            id: 2,
            title: "Johnson LLC Merger",
            status: "Pending",
            deadline: "2023-08-01",
            isPinned: false,
        },
        {
            id: 3,
            title: "Doe v. Acme Corp",
            status: "Closed",
            deadline: "2023-06-10",
            isPinned: false,
        },
    ]);

    // State for search query
    const [searchQuery, setSearchQuery] = useState("");

    // Handler to pin/unpin a case
    const handlePinCase = (caseId: number) => {
        setCases((prevCases) =>
            prevCases.map((case_) =>
                case_.id === caseId ? { ...case_, isPinned: !case_.isPinned } : case_
            )
        );
        const case_ = cases.find((case_) => case_.id === caseId);
        if (case_) {
            toast.success(
                case_.isPinned ? "Case unpinned successfully!" : "Case pinned successfully!"
            );
        }
    };

    // Filtered and sorted cases
    const filteredCases = cases
        .filter((case_) => case_.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));

    return (
        <div className="p-4 sm:p-6 bg-gray-50">
            <Card className="shadow-lg max-w-7xl mx-auto">
                <Toaster position="top-right" reverseOrder={false} />
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Case Management
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Manage your legal cases
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Search Bar */}
                    <div className="mb-8 flex items-center space-x-4">
                        <div className="relative flex-1">
                            <Input
                                placeholder="Search cases..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 py-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <Button
                            variant="outline"
                            className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-100 text-gray-600 rounded-md"
                        >
                            Filter
                        </Button>
                    </div>

                    {/* Case List */}
                    <ScrollArea className="h-[400px]">
                        {filteredCases.length > 0 ? (
                            filteredCases.map((case_) => (
                                <div
                                    key={case_.id}
                                    className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                                >
                                    <div
                                        onClick={() => onCaseSelect(case_.id)}
                                        className="cursor-pointer"
                                    >
                                        <h3 className="font-semibold text-lg text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                            {case_.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">Status: {case_.status}</p>
                                        <p className="text-sm text-gray-600">Deadline: {case_.deadline}</p>
                                    </div>
                                    <div>
                                        <Button
                                            variant="outline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePinCase(case_.id);
                                            }}
                                            className="flex items-center justify-center w-10 h-10"
                                        >
                                            {case_.isPinned ? (
                                                <Star className="text-yellow-500" />
                                            ) : (
                                                <StarOff className="text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center">No cases found.</p>
                        )}
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add New Case
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
