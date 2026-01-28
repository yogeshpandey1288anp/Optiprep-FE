"use client";

import styled from "styled-components";
import Card from "./card";

const Title = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Item = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Loan = styled.p`
  font-size: 13px;
`;

const Date = styled.p`
  font-size: 11px;
  color: #9ca3af;
`;

const Status = styled.span<{ type: string }>`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  color: ${({ type }) =>
    type === "Completed"
      ? "#16a34a"
      : type === "On Hold"
      ? "#dc2626"
      : "#ca8a04"};
  background: ${({ type }) =>
    type === "Completed"
      ? "#dcfce7"
      : type === "On Hold"
      ? "#fee2e2"
      : "#fef9c3"};
`;

const Link = styled.span`
  font-size: 12px;
  color: #9333ea;
  cursor: pointer;
`;

const loans = [
  { id: "4587123698", status: "Pending" },
  { id: "5728491045", status: "Pending" },
  { id: "6819304728", status: "On Hold" },
  { id: "7940158263", status: "Completed" },
  { id: "8051269374", status: "Completed" },
];

export default function LoanTodo() {
  return (
    <Card>
      <Title>Loan To-Do List</Title>

      {loans.map((l) => (
        <Item key={l.id}>
          <Row>
            <div>
              <Loan>Loan no.: {l.id}</Loan>
              <Date>Assigned Date: 11-07-2025</Date>
            </div>
            <Status type={l.status}>{l.status}</Status>
          </Row>

          <Row style={{ marginTop: 6 }}>
            <span />
            <Link>View Details ↗</Link>
          </Row>
        </Item>
      ))}
    </Card>
  );
}
