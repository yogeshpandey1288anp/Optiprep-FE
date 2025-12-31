"use client";

import SideBar from "@/components/layout/SideBar";
import Topbar from "@/components/layout/Topbar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh; /* 🔥 lock viewport */
  overflow: hidden; /* prevent body scroll */
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

/* 🔥 Topbar height assumption */
const TOPBAR_HEIGHT = 64;

const Main = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto; /* 🔥 page scroll */
  height: calc(100vh - ${TOPBAR_HEIGHT}px);
`;

export default function AppLayout({ children }) {
  return (
    <Wrapper>
      <SideBar />

      <Content>
        <Topbar />

        {/* 🔥 height-calculated content */}
        <Main>{children}</Main>
      </Content>
    </Wrapper>
  );
}
