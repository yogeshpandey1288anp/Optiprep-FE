"use client";

import styled from "styled-components";
import Card from "./card";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Title = styled.p`
  font-size: 12px;
  color: #6b7280;
`;

const ValueRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;
`;

const Value = styled.div`
  font-size: 26px;
  font-weight: 600;
`;

const Sub = styled.div`
  font-size: 11px;
  color: #9ca3af;
`;

const Pill = styled.span`
  background: #f3e8ff;
  color: #7c3aed;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
`;

const data = [
  { title: "UW Folder Prepared", value: 88, percent: "93.61%" },
  { title: "Loan on Hold", value: 2, percent: "2.13%" },
  { title: "Remaining Loan", value: 4, percent: "4.26%" },
];

export default function StatsCards() {
  return (
    <Grid>
      {data.map((d) => (
        <Card key={d.title}>
          <Title>{d.title}</Title>
          <ValueRow>
            <div>
              <Value>{d.value}</Value>
              <Sub>Today</Sub>
            </div>
            <Pill>{d.percent}</Pill>
          </ValueRow>
        </Card>
      ))}
    </Grid>
  );
}
