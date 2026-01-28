"use client";

import styled from "styled-components";
import Card from "./card";

const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;

const Sub = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
`;

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 18px;
  height: 180px;
  margin-top: 24px;
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

/* 🔥 TRANSIENT PROP FIX */
const Bar = styled.div<{ $active?: boolean; height: number }>`
  width: 36px;
  height: ${({ height }) => height}px;
  background: ${({ $active }) => ($active ? "#4c1d95" : "#ede9fe")};
  border-radius: 12px;
`;

const Label = styled.span`
  font-size: 11px;
  color: #6b7280;
`;

const values = [80, 75, 65, 82, 94, 5, 4];
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function LoanChart() {
  return (
    <Card className="mt-6">
      <Title>Loan Volume Metrics (Nov 3–7)</Title>
      <Sub>Showing daily volume over one week</Sub>

      <Bars>
        {values.map((v, i) => (
          <BarWrapper key={i}>
            {/* 🔥 FIXED USAGE */}
            <Bar height={v} $active={i === 4} />
            <Label>{days[i]}</Label>
          </BarWrapper>
        ))}
      </Bars>
    </Card>
  );
}
