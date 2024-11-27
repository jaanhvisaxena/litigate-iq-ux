// // components/CaseManagement.tsx
// "use client";
//
// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription,
//     CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { BarChart } from "@/components/ui/chart";
// import { PlusCircle, Star, StarOff, Search } from "lucide-react";
// import { Toaster, toast } from "react-hot-toast";
// import { Input } from "@/components/ui/input";
//
// export default function CaseManagement() {
//     const router = useRouter();
//
//     // State for cases
//     const [cases, setCases] = useState([
//         {
//             id: 1,
//             title: "Smith v. Jones",
//             status: "Active",
//             deadline: "2023-07-15",
//             isPinned: false,
//         },
//         {
//             id: 2,
//             title: "Johnson LLC Merger",
//             status: "Pending",
//             deadline: "2023-08-01",
//             isPinned: false,
//         },
//         {
//             id: 3,
//             title: "Doe v. Acme Corp",
//             status: "Closed",
//             deadline: "2023-06-10",
//             isPinned: false,
//         },
//         // Add more cases as needed
//     ]);
//
//     // State for search query
//     const [searchQuery, setSearchQuery] = useState("");
//
//     // Handler to pin/unpin a case
//     const handlePinCase = (caseId: number) => {
//         setCases((prevCases) =>
//             prevCases.map((case_) =>
//                 case_.id === caseId ? { ...case_, isPinned: !case_.isPinned } : case_
//             )
//         );
//         const case_ = cases.find((case_) => case_.id === caseId);
//         if (case_) {
//             toast.success(
//                 case_.isPinned ? "Case unpinned successfully!" : "Case pinned successfully!"
//             );
//         }
//     };
//
//     // Handler to navigate to case detail page
//     const handleViewDetails = (caseId: number) => {
//         router.push(`/cases/${caseId}`);
//     };
//
//     // Filtered and sorted cases
//     const filteredCases = cases
//         .filter((case_) =>
//             case_.title.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//         .sort((a, b) => {
//             if (a.isPinned === b.isPinned) return 0;
//             return a.isPinned ? -1 : 1;
//         });
//
//     // Count of cases by status for the bar chart
//     const caseStatusCounts = cases.reduce(
//         (acc, case_) => {
//             if (case_.status === "Active") acc.active += 1;
//             else if (case_.status === "Pending") acc.pending += 1;
//             else if (case_.status === "Closed") acc.closed += 1;
//             return acc;
//         },
//         { active: 0, pending: 0, closed: 0 }
//     );
//
//     return (
//         <Card className="p-4">
//             <Toaster position="top-right" reverseOrder={false} />
//             <CardHeader>
//                 <CardTitle className="text-2xl font-bold">Case Management</CardTitle>
//                 <CardDescription>Manage your legal cases</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 {/* Search Bar */}
//                 <div className="mb-4 flex items-center">
//                     <div className="relative w-full">
//                         <Input
//                             placeholder="Search cases..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full pl-10"
//                         />
//                         <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                 </div>
//                 <ScrollArea className="h-[300px]">
//                     {filteredCases.map((case_) => (
//                         <div
//                             key={case_.id}
//                             className="flex items-center justify-between p-4 border-b"
//                         >
//                             <div>
//                                 <h3 className="font-semibold text-lg">{case_.title}</h3>
//                                 <p className="text-sm text-gray-600">
//                                     Status: {case_.status}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                     Deadline: {case_.deadline}
//                                 </p>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Button onClick={() => handleViewDetails(case_.id)}>
//                                     View Details
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     onClick={() => handlePinCase(case_.id)}
//                                     className="flex items-center justify-center w-10 h-10"
//                                 >
//                                     {case_.isPinned ? (
//                                         <Star className="text-yellow-500" />
//                                     ) : (
//                                         <StarOff className="text-gray-500" />
//                                     )}
//                                 </Button>
//                             </div>
//                         </div>
//                     ))}
//                 </ScrollArea>
//             </CardContent>
//             <CardFooter className="flex items-center justify-between">
//                 <Button className="flex items-center">
//                     <PlusCircle className="mr-2 h-5 w-5" />
//                     Add New Case
//                 </Button>
//                 {/* You can add other footer elements here */}
//             </CardFooter>
//             <CardContent>
//                 <h2 className="text-xl font-semibold mb-4">Case Status Overview</h2>
//                 <BarChart
//                     data={[
//                         { name: "Active", value: caseStatusCounts.active },
//                         { name: "Pending", value: caseStatusCounts.pending },
//                         { name: "Closed", value: caseStatusCounts.closed },
//                     ]}
//                     config={{
//                         value: {
//                             label: "Cases",
//                             color: "#3b82f6",
//                         },
//                     }}
//                     className="h-[300px]"
//                 />
//             </CardContent>
//         </Card>
//     );
// }
// components/CaseManagement.tsx
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

export default function CaseManagement() {
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
        // Add more cases as needed
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
                !case_.isPinned
                    ? "Case pinned successfully!"
                    : "Case unpinned successfully!"
            );
        }
    };

    // Handler to navigate to case detail page
    const handleViewDetails = (caseId: number) => {
        router.push(`/cases/${caseId}`);
    };

    // Filtered and sorted cases
    const filteredCases = cases
        .filter((case_) =>
            case_.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (a.isPinned === b.isPinned) return 0;
            return a.isPinned ? -1 : 1;
        });

    return (
        <Card className="p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Case Management</CardTitle>
                <CardDescription>Manage your legal cases</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Search Bar */}
                <div className="mb-4 flex items-center">
                    <div className="relative w-full">
                        <Input
                            placeholder="Search cases..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <ScrollArea className="h-[300px]">
                    {filteredCases.map((case_) => (
                        <div
                            key={case_.id}
                            className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-gray-100 transition"
                            onClick={() => handleViewDetails(case_.id)}
                        >
                            <div>
                                <h3 className="font-semibold text-lg">{case_.title}</h3>
                                <p className="text-sm text-gray-600">
                                    Status: {case_.status}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Deadline: {case_.deadline}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the click from bubbling up
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
                    ))}
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <Button className="flex items-center">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add New Case
                </Button>
                {/* You can add other footer elements here */}
            </CardFooter>
        </Card>
    );
}
