import { ReactNode } from "react";
import styled from "styled-components";

interface TopBarProps {
  children: ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return <TopBarWrapper>{children}</TopBarWrapper>;
}

const TopBarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  /* display: flex; */ // No Need for flex
  padding: 1.25rem 3rem;
  background-color: #ffffff;
`;
