import React from "react";
import styled from "styled-components";
import { Times } from "icons/light";

interface OwnProps {
  children: string;
  onClose: () => void;
}

const HeaderText = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f1f3f4;
  svg {
    width: 16px;
    cursor: pointer;
  }
`;

const DrawerHeader = ({ children, onClose }: OwnProps) => {
  return (
    <HeaderWrapper>
      <HeaderText>{children}</HeaderText>
      <Times onClick={onClose} />
    </HeaderWrapper>
  );
};

export default DrawerHeader;
