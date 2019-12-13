import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  height: 220px;
`;

const StyledHeader = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
`;

const StyledItem = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: space-between;

  span {
    font-size: 13px;
    color: gray;
  }
`;

const UpcomingEvents = () => {
  return (
    <StyledWrapper>
      <StyledHeader>Upcoming events</StyledHeader>
      <StyledItem>
        Event 1 <span>in 17 days</span>
      </StyledItem>
      <StyledItem>
        Event 2 <span>in 23 days</span>
      </StyledItem>
      <StyledItem>
        Event 3 <span>in 1 month</span>
      </StyledItem>
      <StyledItem>
        Event 4 <span>in 2 months</span>
      </StyledItem>
      <StyledItem>
        Event 5 <span>in 3 months</span>
      </StyledItem>
    </StyledWrapper>
  );
};

export default UpcomingEvents;
