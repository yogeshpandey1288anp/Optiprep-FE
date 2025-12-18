"use client";

import styled, { css } from "styled-components";

/* ---------- BASE ---------- */

const base = css`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  border: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

/* ---------- PRIMARY ---------- */

export const PrimaryButton = styled.button`
  ${base};
  background: ${({ theme }) => theme.primary || "#522463"};
  color: #fff;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

/* ---------- OUTLINE ---------- */

export const OutlineButton = styled.button`
  ${base};
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1.5px solid ${({ theme }) => theme.border || "#cbd5e1"};

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.04);
  }
`;

/* ---------- GHOST ---------- */

export const GhostButton = styled.button`
  ${base};
  background: transparent;
  color: ${({ theme }) => theme.text};

  &:hover:not(:disabled) {
    opacity: 0.75;
  }
`;
