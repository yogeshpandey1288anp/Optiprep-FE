"use client";

import styled from "styled-components";


/* ---------- Layout ---------- */

const Card = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  border: ${({ primary }) => (primary ? "none" : "1px solid #d1d5db")};
  background: ${({ primary }) => (primary ? "#4c1d95" : "#ffffff")};
  color: ${({ primary }) => (primary ? "#ffffff" : "#374151")};
`;

const Divider = styled.hr`
  margin: 18px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

/* ---------- Tabs ---------- */

const Tabs = styled.div`
  display: flex;
  gap: 22px;
  font-size: 13px;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding-bottom: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  color: ${({ active }) => (active ? "#4c1d95" : "#6b7280")};
  border-bottom: ${({ active }) =>
    active ? "2px solid #4c1d95" : "2px solid transparent"};
`;

/* ---------- Table ---------- */

const TableWrapper = styled.div`
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
`;

const Th = styled.th`
  background: #f6eafe;
  padding: 12px;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  color: #374151;
`;

const Remark = styled.span`
  font-size: 12px;
  color: #16a34a;
  font-weight: 500;
`;

/* ---------- Footer ---------- */

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

/* ---------- Data ---------- */

const tabs = [
  "DOT",
  "Note",
  "Title",
  "Title Checklist",
  "Neighborhood Watch",
  "Imminent Default Certificate",
  "Previous MOD_PC",
  "MSR1",
];

const rows = [
  {
    category: "Borrower Info",
    field: "Borrower Name",
    director: "Alex Johnson",
    extracted: "Alex Johnson",
  },
  {
    category: "Borrower Info",
    field: "Contact Info",
    director: "2457 Maplewood Avenue, Dallas, TX 75204",
    extracted: "2457 Maplewood Avenue, Dallas, TX 75204",
  },
  {
    category: "Loan Info",
    field: "Loan Amount",
    director: "$325,000",
    extracted: "$325,000",
  },
  {
    category: "Loan Info",
    field: "Interest Rate",
    director: "5.25%",
    extracted: "5.25%",
  },
  {
    category: "Loan Info",
    field: "Loan Number",
    director: "4587123698",
    extracted: "4587123698",
  },
  {
    category: "Property Info",
    field: "Property Address",
    director: "2457 Maplewood Avenue, Dallas, TX 75204",
    extracted: "2457 Maplewood Avenue, Dallas, TX 75204",
  },
  {
    category: "Property Value",
    field: "Property Value",
    director: "$350,000",
    extracted: "$350,000",
  },
  {
    category: "Acknowledgment",
    field: "Notary Signature",
    director: "Maria Thomson",
    extracted: "Maria Thomson",
  },
];

/* ---------- Component ---------- */

export default function ExtractedLoanDetails() {
  return (
    <Card>
      <Header>
        <div>
          <Title>AI-Extracted Loan Details</Title>
          <SubTitle>
            Borrower: <b>Johnson, Alex</b> | Loan No.: 4587123698 | Loan Type: FHA
          </SubTitle>
        </div>

        <Actions>
          <Button primary>Task</Button>
          <Button primary>Create Folder</Button>
        </Actions>
      </Header>

      <Divider />

      <Tabs>
        {tabs.map((tab, i) => (
          <Tab key={tab} active={i === 0}>
            {tab}
          </Tab>
        ))}
      </Tabs>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Category</Th>
              <Th>Field Name</Th>
              <Th>Director Value</Th>
              <Th>Extracted Value</Th>
              <Th>Remark</Th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <Td>{row.category}</Td>
                <Td>{row.field}</Td>
                <Td>{row.director}</Td>
                <Td>{row.extracted}</Td>
                <Td>
                  <Remark>Match Found</Remark>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <Footer>
        <Button>Back</Button>
      </Footer>
    </Card>
  );
}
