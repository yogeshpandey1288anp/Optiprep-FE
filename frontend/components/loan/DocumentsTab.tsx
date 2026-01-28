"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  ScrollArea,
  ListRow,
  SmallText,
  LinkText,
  DocumentGrid,
} from "./LoanStyles";
import DocumentPreviewModal from "./DocumentPreviewModal";

/* ---------- Local styles ---------- */

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const PdfIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f3e8ff;
  color: #6b21a8;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DocInfo = styled.div`
  flex: 1;
`;

const DocName = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const ChecklistRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px 60px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
  justify-self: center;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  accent-color: #6b21a8;
  cursor: pointer;
`;

const SoftCard = styled.div`
  background: #e2e8f0;
  padding: 30px 20px;
  height: 100%;
  border-radius: 10px;

  @media (max-width: 1440px) {
    padding: 20px;
  }
`;

/* ---------- Data ---------- */

const documents = [
  {
    name: "31 OM_Note.pdf",
    date: "11-06-2025",
    url: "/documents/31_OM_Note.pdf",
  },
  {
    name: "30 Origination Mortgage_DOT.pdf",
    date: "10-22-2025",
    url: "/documents/30_Origination_Mortgage_DOT.pdf",
  },
  {
    name: "12 IDI Imminent Default Certificate.pdf",
    date: "10-22-2025",
    url: "/documents/12_IDI_Imminent_Default_Certificate.pdf",
  },
  {
    name: "17 Title.pdf",
    date: "10-04-2025",
    url: "/documents/17_Title.pdf",
  },
  {
    name: "19 NW Neighborhood Watch.pdf",
    date: "09-07-2025",
    url: "/documents/19_NW_Neighborhood_Watch.pdf",
  },
];

const checklist = [
  "Foreclosure fees and cost",
  "Imminent Default Certificate",
  "Title",
  "SMART Integrated Portal",
  "Neighborhood Watch",
];

/* ---------- Component ---------- */

export default function DocumentsTab() {
  const [previewDoc, setPreviewDoc] = useState<{
    name: string;
    url: string;
  } | null>(null);

  return (
    <>
      <DocumentGrid>
        {/* LEFT */}
        <SoftCard>
          <SectionTitle>Available Documents</SectionTitle>

          <ScrollArea>
            {documents.map((doc) => (
              <ListRow key={doc.name}>
                <PdfIcon>PDF</PdfIcon>

                <DocInfo>
                  <DocName>{doc.name}</DocName>
                  <SmallText>
                    Date: {doc.date} |{" "}
                    <LinkText
                      onClick={() =>
                        setPreviewDoc({ name: doc.name, url: doc.url })
                      }
                    >
                      View Document ↗
                    </LinkText>
                  </SmallText>
                </DocInfo>
              </ListRow>
            ))}
          </ScrollArea>
        </SoftCard>

        {/* RIGHT */}
        <SoftCard>
          <SectionTitle>FHA Loan Checklist</SectionTitle>

          <ScrollArea>
            {checklist.map((item) => (
              <ChecklistRow key={item}>
                <span>{item}</span>

                <Option>
                  Yes <Checkbox />
                </Option>

                <Option>
                  No <Checkbox />
                </Option>
              </ChecklistRow>
            ))}
          </ScrollArea>
        </SoftCard>
      </DocumentGrid>

      {/* PDF MODAL */}
      {previewDoc && (
        <DocumentPreviewModal
          fileName={previewDoc.name}
          fileUrl={previewDoc.url}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </>
  );
}
