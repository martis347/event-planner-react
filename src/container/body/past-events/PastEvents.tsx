import React, { useMemo } from "react";
import styled from "styled-components";
import { EventData, EventVars, PAST_EVENTS } from "../past-events/query";
import { useQuery } from "@apollo/react-hooks";
import EventRating from "./EventRating";

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
  cursor: pointer;

  :hover {
    background-color: rgba(32, 33, 36, 0.039);
  }

  :active {
    background-color: #eceffa;
  }
`;

const today = new Date();
const PastEvents = () => {
  const { data } = useQuery<EventData, EventVars>(PAST_EVENTS, {
    variables: {
      to: today
    }
  });

  const events = useMemo(
    () =>
      data?.events.map(e => (
        <StyledItem key={e.id}>
          {e.name}
          <EventRating ratings={e.ratings} />
        </StyledItem>
      )),
    [data]
  );

  return (
    <StyledWrapper>
      <StyledHeader>Past events</StyledHeader>
      {events}
    </StyledWrapper>
  );
};

export default PastEvents;
