"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import LoanTasks from "./LoanTasks";


import {
    Card,
    Title,
    SubTitle,
    Footer,
    Button,
} from "./LoanStyles";

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

export default function LoanManagement() {
    const [activeTab, setActiveTab] = useState("borrower");
    const [showExtractModal, setShowExtractModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showExtractedPage, setShowExtractedPage] = useState(false);
    const [showTasks, setShowTasks] = useState(false);

    const contentRef = useRef<HTMLDivElement | null>(null);

    /* ---------- Tab change ---------- */

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

    return (
        <>

            <Card>

                <Header>
                    <div>
                        <Title>Loan Management</Title>
                        <SubTitle>
                            Borrower: <b>Johnson, Alex</b> | Loan No.: 4587123698 | Loan Type:
                            FHA
                        </SubTitle>
                    </div>

                    <Button $primary onClick={() => setShowTasks(true)}>
                        Task
                    </Button>
                </Header>

                <LoanTabs activeTab={activeTab} onChange={handleTabChange} />

                {/* 🔥 KEEP TABS MOUNTED */}
                <TabContent ref={contentRef}>
                    <div style={{ display: activeTab === "borrower" ? "block" : "none" }}>
                        <LoanForm />
                    </div>

                    <div style={{ display: activeTab === "loan" ? "block" : "none" }}>
                        <LoanAccountDetailsForm />
                    </div>

                    <div style={{ display: activeTab === "documents" ? "block" : "none" }}>
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

            {/* 🔥 PROGRESS MODAL */}
            {showExtractModal && <ExtractProgressModal progress={progress} />}
        </>
    );
}
