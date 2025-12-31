"use client";

import styled from "styled-components";
import { useSidebar } from "@/context/SidebarContext";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiFileText,
  FiHelpCircle,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import Image from "next/image";
import logo from "@/public/Images/innerlogo.png";
// import { logoutUser } from "";

// ---------------- Styled Components ----------------

const SidebarWrapper = styled.div<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "240px")};
  transition: 0.3s ease;
  height: 100vh;

  background: ${({ theme }) => theme.sidebarBg};
  border-right: 3px solid ${({ theme }) => theme.sidebarBorder};
  color: ${({ theme }) => theme.sidebarText};

  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CollapseBtn = styled.button<{ $collapsed: boolean }>`
  position: absolute;
  right: -14px;
  top: 20px;
  background: #522463;
  border: 3px solid #2f1051;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LogoContainer = styled.div<{ $collapsed: boolean }>`
  display: flex;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  margin-bottom: 32px;
`;

const MiddleSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 14px;
  margin-top: 20px;
`;

const MenuItem = styled.div<{ $active?: boolean; $collapsed: boolean }>`
  padding: 12px;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.sidebarText};
  gap: ${({ collapsed }) => (collapsed ? "0px" : "14px")};

  background: ${({ active }) =>
    active ? "rgba(255,255,255,0.15)" : "transparent"};

  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s ease;
  &:hover {
    background: rgba(255,255,255,0.12);
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
  }
`;

const BottomSection = styled.div`
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// ---------------- Sidebar Component ----------------

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    // if (token) await logoutUser(token);

    localStorage.removeItem("authToken");
    window.location.href = "/auth/login";
  };


  const getDashboard = () => {
    window.location.href = "/main/dashboard";
  };

  const getHistory = () => {
    window.location.href = "/main/history";
  };



  return (
    <SidebarWrapper $collapsed={collapsed}>

      <CollapseBtn $collapsed={collapsed} onClick={toggleSidebar}>
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </CollapseBtn>

      <LogoContainer $collapsed={collapsed}>
        <Image src={logo} alt="IndexAI Logo" width={collapsed ? 40 : 110} />
      </LogoContainer>

      <MiddleSection>
        <MenuItem $active $collapsed={collapsed}
          onClick={getDashboard}>
          <FiHome size={20} />
          <span>Dashboard</span>
        </MenuItem>

        <MenuItem $collapsed={collapsed}>
          <FiUsers size={20} />
          <span>User Management</span>
        </MenuItem>

        <MenuItem $collapsed={collapsed}>
          <FiSettings size={20} />
          <span>Configuration</span>
        </MenuItem>

        <MenuItem $collapsed={collapsed}

          onClick={getHistory}>
          <FiFileText size={20} />
          <span>History</span>
        </MenuItem>
      </MiddleSection>

      <BottomSection>
        <MenuItem $collapsed={collapsed} >
          <FiHelpCircle size={20} />
          <span>Help and Support</span>
        </MenuItem>

        <MenuItem $collapsed={collapsed}
          onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </MenuItem>
      </BottomSection>

    </SidebarWrapper>
  );
}
