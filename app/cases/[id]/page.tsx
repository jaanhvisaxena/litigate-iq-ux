"use client";

import { useParams } from "next/navigation";
import CaseDetailView from "@/components/CaseDetailView";

export default function CaseDetailPage() {
    const params = useParams();
    const id = params?.id;

    if (!id || Array.isArray(id)) {
        return <p>Invalid case ID</p>;
    }

    const caseId = parseInt(id, 10);

    if (isNaN(caseId)) {
        return <p>Invalid case ID</p>;
    }

    return <CaseDetailView caseId={caseId} />;
}
