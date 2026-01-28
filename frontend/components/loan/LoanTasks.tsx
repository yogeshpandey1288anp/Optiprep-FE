"use client";

import styled from "styled-components";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";

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

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  background: #4c1d95;
  color: #ffffff;
  border: none;
`;

const Divider = styled.hr`
  margin: 18px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

/* ---------- Table ---------- */

const TableWrapper = styled.div`
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
`;

const Status = styled.span<{ type: "open" | "closed" }>`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 500;
  background: ${({ type }) =>
    type === "open" ? "#fff7ed" : "#ecfdf5"};
  color: ${({ type }) =>
    type === "open" ? "#f97316" : "#16a34a"};
`;

/* ---------- Footer ---------- */

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

/* ---------- Data ---------- */

const tasks = [
  {
    id: "675791",
    date: "11-07-2025",
    by: "Naresh Kumar",
    description: "Please share the SMART Integrated Portal document...",
    status: "open",
  },
  {
    id: "675792",
    date: "11-07-2025",
    by: "Naresh Kumar",
    description:
      "Borrower’s property address does not match, updated...",
    status: "closed",
  },
];

/* ---------- Component ---------- */

export default function LoanTasks({
  onBack,
}: {
  onBack: () => void;
}) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <Card>
        <Header>
          <div>
            <Title>Loan Management</Title>
            <SubTitle>
              Borrower: <b>Johnson, Alex</b> | Loan No.: 4587123698 | Loan Type: FHA
            </SubTitle>
          </div>

          <Button onClick={() => setShowCreate(true)}>
            Create Task
          </Button>
        </Header>

        <Divider />

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Task ID</Th>
                <Th>Created On</Th>
                <Th>Created By</Th>
                <Th>Task Description</Th>
                <Th>Status</Th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <Td style={{ color: "#7c3aed", fontWeight: 500 }}>
                    {task.id}
                  </Td>
                  <Td>{task.date}</Td>
                  <Td>{task.by}</Td>
                  <Td>{task.description}</Td>
                  <Td>
                    <Status type={task.status as "open" | "closed"}>
                      {task.status === "open" ? "Open" : "Closed"}
                    </Status>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Footer>
          <button
            onClick={onBack}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </Footer>
      </Card>

      {/* 🔥 JIRA-style modal rendered at root */}
      {showCreate && (
        <CreateTaskModal onClose={() => setShowCreate(false)} />
      )}
    </>
  );
}
