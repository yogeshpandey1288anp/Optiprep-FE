"use client";

import LoanManagement from "@/components/loan/LoanManagement";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const externalCaseId = pathname.split("/").pop() as string;

  console.log("Loan Page - externalCaseId:", externalCaseId);

  return <LoanManagement externalCaseId={externalCaseId} />;
}