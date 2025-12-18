"use client";

import styled from "styled-components";
import { FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useThemeMode } from "@/context/ThemeContext";

import { useEffect, useState } from "react";


const TopWrapper = styled.div`
  height: 72px;
  background: ${({ theme }) => theme.card};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 30px;
  gap: 22px;
`;

const IconButton = styled.button`
  background: ${({ theme }) => theme.background};
  padding: 10px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  transition: 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  background: #522463;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 14px;
    font-weight: 600;
  }

  span:last-child {
    font-size: 12px;
    color: gray;
  }
`;

export default function Topbar() {
  const { mode, toggleTheme } = useThemeMode();
  const  [user, setUser] = useState<{first_name: string; last_name:string; email: string} | null>(null);


useEffect(() => {
const token = localStorage.getItem("authToken");
  console.log("TOKEN FROM STORAGE:", token);
  if (!token) return;
  getUserProfile(token).then(setUser).catch(console.error);
}, []);

const initials =
  user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : "U";


  return (
    <TopWrapper>
      {/* THEME TOGGLE */}
      <IconButton onClick={toggleTheme} title="Toggle theme">
        {mode === "light" ? (
          <FiMoon size={22} />
        ) : (
          <FiSun size={22} />
        )}
      </IconButton>

      {/* NOTIFICATION */}
      <IconButton>
        <FiBell size={20} />
      </IconButton>

      {/* USER PROFILE */}
      <UserBox>
        <UserInfo>
           {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
          <span>{user?.email || ""}</span>
        </UserInfo>
        <Avatar>{initials}</Avatar>
      </UserBox>
    </TopWrapper>
  );
}
