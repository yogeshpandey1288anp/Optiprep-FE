import styled from "styled-components";

/* ---- Card ---- */
export const Card = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 10px;
  // box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);

  display: flex;              
  flex-direction: column;     
  height: 100%;              
`;

/* ---- Headings ---- */
export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

export const SubTitle = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

/* ---- Tabs ---- */
export const Tabs = styled.div`
  position: relative; 
  display: flex;
  gap: 24px;
  margin-top: 20px;
  border-bottom: 1px solid #e5e7eb;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  position: relative;
  padding-bottom: 10px;
  font-size: 13px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#4c1d95" : "#6b7280")};
  font-weight: ${({ $active }) => ($active ? "600" : "600")};
  font-family: 'Inter';
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: #4c1d95;
  border-radius: 2px;
  will-change: transform, width;
`;



export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex
`;

export const Label = styled.label`
  font-size: 12px;
  color: #6b7280;
`;

export const Input = styled.input`
  background: #f6effb;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 13px;
  border: none;
  outline: none;
  color: #1f2937;
`;

/* ---- Footer Buttons ---- */
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;


export const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13px;
  cursor: pointer;
  background: ${({ $primary }) => ($primary ? "#4c1d95" : "#ffffff")};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#374151")};
  border: ${({ $primary }) => ($primary ? "none" : "1px solid #d1d5db")};
`;

/* ---- Shared Lists ---- */

export const ScrollArea = styled.div`
  overflow-y: auto;
  padding-right: 8px;
  height: 100%;
`;

export const ListRow = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
`;

/* ---- Typography helpers ---- */

export const SmallText = styled.p`
  font-size: 11px;
  color: #6b7280;
`;

export const LinkText = styled.span`
  font-size: 11px;
  color: #7c3aed;
  cursor: pointer;
`;


export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
`;


export const DocumentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    height: 100%;
`;

