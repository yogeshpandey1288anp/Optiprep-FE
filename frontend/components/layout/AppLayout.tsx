"use client";

import Sidebar from "@/components/Layout/Sidebar";
import Topbar from "@/components/Layout/Topbar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.background};
`;

export default function AppLayout({ children }) {
  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Topbar />
        <main style={{ padding: "24px" }}>{children}</main>
      </Content>
    </Wrapper>
  );
}
