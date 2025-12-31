"use client";

import styled from "styled-components";
import Card from "./card";

const Search = styled(Card)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
`;

export default function SearchBar() {
  return (
    <Search>
      🔍
      <Input placeholder="Search by loan number" />
    </Search>
  );
}
