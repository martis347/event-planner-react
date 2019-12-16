import React, { useMemo } from "react";
import styled from "styled-components";
import { EventData, EventVars, PAST_EVENTS } from "../past-events/query";
import { useQuery } from "@apollo/react-hooks";
import EventReview from "./EventReview";
import { Event } from "models";
import { Loader } from "global-components";

interface OwnProps {
  onEventClick: (event: Event) => void;
}

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
  height: 20px;

  :hover {
    background-color: rgba(32, 33, 36, 0.039);
  }

  :active {
    background-color: #eceffa;
  }
`;

const today = new Date();
const PastEvents = ({ onEventClick }: OwnProps) => {
  const { data, loading } = useQuery<EventData, EventVars>(PAST_EVENTS, {
    variables: {
      to: today
    }
  });

  const events = useMemo(
    () =>
      (data?.events || []).reverse().map(e => (
        <StyledItem key={e.id} onClick={() => onEventClick(e)}>
          {e.name}
          <EventReview reviews={e.reviews} />
        </StyledItem>
      )),
    [data, onEventClick]
  );

  return (
    <StyledWrapper>
      <StyledHeader>Past events</StyledHeader>
      {loading ? <Loader /> : events}
    </StyledWrapper>
  );
};

export default PastEvents;
