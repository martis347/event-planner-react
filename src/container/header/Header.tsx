import React from "react";
import styled from "styled-components";
import { User } from "icons/regular";

const StyledWrapper = styled.div`
  height: 60px;
  background-color: #182659;
  display: flex;
  justify-content: space-between;

  img {
    height: 36px;
    padding: 12px;
  }
`;

const StyledUsername = styled.div`
  & {
    display: flex;
    align-items: center;
    padding-right: 12px;

    span {
      color: white;
    }
    svg {
      path {
        color: white;
      }
      width: 13px;
      padding-right: 6px;
    }
  }
`;

const Header = () => {
  return (
    <StyledWrapper>
      <img src="/logo.svg" alt="Hyarchis logo" />
      <StyledUsername>
        <User />
        <span>Administrator</span>
      </StyledUsername>
    </StyledWrapper>
  );
};

export default Header;
