"use client";

import Header from "@/components/dashboard-ui/Header";
import LoanChart from "@/components/dashboard-ui/LoanChart";
import LoanTodo from "@/components/dashboard-ui/LoanTodo";
import Stats from "@/components/dashboard-ui/Stats";
import { use } from "react";
import styled from "styled-components";


const Wrapper = styled.main`
  margin: auto;
`;

const Grid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
`;

const Left = styled.div`
  display: flex
  flex-direction: column;
  gap: 24px;
`;

export default function DashboardPage() {
    return (
        <Wrapper>
            <Header />
            <Grid>
                <Left>
                    <Stats />
                    <LoanChart />
                </Left>
                <LoanTodo />
            </Grid>
        </Wrapper>
    );
}
