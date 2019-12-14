import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  height: 220px;
`;

const StyledHeader = styled.div`
  font-weight: 500;
  margin-bottom: 16px;
`;

const StyledItem = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  padding: 6px;
  margin: 0 -6px;
  background-color: transparent;
  transition: 0.1s all;

  :hover {
    background-color: rgba(32, 33, 36, 0.039);
  }
`;

const PastEvents = () => {
  return (
    <StyledWrapper>
      <StyledHeader>Past events</StyledHeader>
      <StyledItem>Event 1</StyledItem>
      <StyledItem>Event 2</StyledItem>
      <StyledItem>Event 3</StyledItem>
      <StyledItem>Event 4</StyledItem>
      <StyledItem>Event 5</StyledItem>
    </StyledWrapper>
  );
};

export default PastEvents;
