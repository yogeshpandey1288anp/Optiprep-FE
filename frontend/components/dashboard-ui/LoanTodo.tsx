"use client";

import styled from "styled-components";
import Card from "./card";
import { useEffect, useState } from "react";
import {
  BorrowerDirectoryOut,
  getAllDirectorToolData,
  getDirectorToolData,
} from "@/app/lib/api/directortool.api";
import { useRouter } from "next/navigation";

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

export default function LoanTodo() {
  const [loans, setLoans] = useState<BorrowerDirectoryOut[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getAllDirectorToolData();
        setLoans(data);
      } catch (error) {
        console.error("Failed to fetch loan todo list", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
      <Card>
        <Title>Loan To-Do List</Title>
        <p style={{ fontSize: 12, color: "#6b7280" }}>Loading...</p>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Loan To-Do List</Title>

      {loans.map((l) => {
        const status =
          l.loan_account.current_payment_status === "active"
            ? "In Progress"
            : "Completed";

        return (
          <Item key={l.id}>
            <Row>
              <div>
                <Loan>Loan no.: {l.loan_account.loan_number}</Loan>
                <Date>Assigned Date: {}</Date>
              </div>
              <Status type={status}>{status}</Status>
            </Row>

            <Row style={{ marginTop: 6 }}>
              <span />
              <Link
                onClick={() => router.push(`/main/loan/${l.external_case_id}`)}
              >
                View Details ↗
              </Link>
            </Row>
          </Item>
        );
      })}
    </Card>
  );
}
