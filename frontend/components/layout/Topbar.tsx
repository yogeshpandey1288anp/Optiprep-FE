"use client";

import styled from "styled-components";
import { FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import {getUserProfile} from "@/app/lib/api/auth.api";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";


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

type UserProfile = {
  firstname: string;
  lastname: string;
  email: string;
};

export default function Topbar() {
  const { mode, toggleTheme } = useTheme();


  const token = useAuthStore((state) => state.token);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

const initials = user?.firstname && user?.lastname
  ? `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase()
  : "U";


  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(token);
        setUser(profile);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <TopWrapper>

      <IconButton onClick={toggleTheme} title="Toggle theme">
        {mode === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
      </IconButton>

    
      <IconButton>
        <FiBell size={20} />
      </IconButton>

      <UserBox>
        <UserInfo>
          <span>
            {loading
              ? "Loading..."
              : user
              ? `${user.firstname} ${user.lastname}`
              : "User"}
          </span>
          <span>{user?.email || ""}</span>
        </UserInfo>
        <Avatar>{initials}</Avatar>
      </UserBox>
    </TopWrapper>
  );
}