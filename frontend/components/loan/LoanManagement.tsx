"use client";

import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import LoanTasks from "./LoanTasks";
import {
  BorrowerDirectoryOut,
  getDirectorToolData,
} from "@/app/lib/api/directortool.api";

import { Card, Title, SubTitle, Footer, Button } from "./LoanStyles";

import LoanTabs from "./LoanTabs";
import LoanForm from "./LoanForm";
import LoanAccountDetailsForm from "./LoanAccountDetailsForm";
import DocumentsTab from "./DocumentsTab";
import ExtractProgressModal from "./ExtractProgressModal";
import ExtractedLoanDetails from "./ExtractedLoanDetails";
import { animateTabSwitch } from "./useTabAnimation";

/* ---------- Layout ---------- */

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TabContent = styled.div`
  flex: 1;
  margin-top: 24px;
  overflow: hidden;
`;

/* ---------- Component ---------- */

export default function LoanManagement({
  externalCaseId,
}: {
  externalCaseId: string;
}) {
  const [activeTab, setActiveTab] = useState("borrower");
  const [showExtractModal, setShowExtractModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showExtractedPage, setShowExtractedPage] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [loanData, setLoanData] = useState<BorrowerDirectoryOut | null>(null);
  const [loading, setLoading] = useState(true);

  const contentRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Tab change ---------- */

  useEffect(() => {
   console.log(externalCaseId);
     if (!externalCaseId) {
    console.warn("externalCaseId missing — skipping API call");
    return;
  }
    const fetchData = async () => {
      try {
        const data = await getDirectorToolData(externalCaseId);
        setLoanData(data);
      } catch (error) {
        console.error("Error fetching Director Tool Data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [externalCaseId]);

  const handleTabChange = (nextTab: string) => {
    if (nextTab === activeTab) return;

    animateTabSwitch(contentRef, () => {
      setActiveTab(nextTab);
    });
  };

  /* ---------- Extract ---------- */

  const handleExtract = () => {
    setShowExtractModal(true);
    setProgress(0);

    let value = 0;
    const interval = setInterval(() => {
      value += 4;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setShowExtractModal(false);
          setShowExtractedPage(true); // 🔥 SHOW RESULT PAGE
        }, 500);
      }
    }, 120);
  };

  /* ---------- AFTER EXTRACTION ---------- */

  if (showExtractedPage) {
    return <ExtractedLoanDetails />;
  }

  if (showTasks) {
    return <LoanTasks onBack={() => setShowTasks(false)} />;
  }
  /* ---------- MAIN UI ---------- */

  if (loading) {
    return (
      <Card>
        <Title>Loan Management</Title>
        <p style={{ fontSize: 12, color: "#6b7280" }}>Loading loan data...</p>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Header>
          <div>
            <Title>Loan Management</Title>
            <SubTitle>
              Borrower: <b>{loanData?.borrower.borrower_name}</b> | Loan No.:{" "}
              {loanData?.loan_account.loan_number} | Loan Type:{" "}
              {loanData?.loan_account.loan_type}
            </SubTitle>
          </div>

          <Button $primary onClick={() => setShowTasks(true)}>
            Task
          </Button>
        </Header>

        <LoanTabs activeTab={activeTab} onChange={handleTabChange} />

       
        <TabContent ref={contentRef}>
          <div style={{ display: activeTab === "borrower" ? "block" : "none" }}>
            <LoanForm data={loanData?.borrower} />
          </div>

          <div style={{ display: activeTab === "loan" ? "block" : "none" }}>
            <LoanAccountDetailsForm    data={loanData?.loan_account} />
          </div>

          <div
            style={{ display: activeTab === "documents" ? "block" : "none" }}
          >
            <DocumentsTab />
          </div>
        </TabContent>

        <Footer>
          <Button>Back</Button>
          <Button $primary onClick={handleExtract}>
            Extract
          </Button>
        </Footer>
      </Card>

      {showExtractModal && <ExtractProgressModal progress={progress} />}
    </>
  );
}
