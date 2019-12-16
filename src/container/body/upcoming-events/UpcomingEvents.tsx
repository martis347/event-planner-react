import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Loader } from "global-components";
import { UPCOMING_EVENTS, EventVars, EventData } from "./query";
import {
  differenceInCalendarMonths,
  parseISO,
  differenceInCalendarDays
} from "date-fns";
import { Event } from "models";

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

  span {
    font-size: 13px;
    color: gray;
  }
`;

const today = new Date();
const getTimeLeft = (date: string) => {
  const daysLeft = differenceInCalendarDays(parseISO(date), today);

  if (daysLeft > 30) {
    const monthsLeft = differenceInCalendarMonths(parseISO(date), today);
    return `${monthsLeft} month${monthsLeft > 1 ? "s" : ""}`;
  }

  return `${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
};

const UpcomingEvents = ({ onEventClick }: OwnProps) => {
  const { data, loading } = useQuery<EventData, EventVars>(UPCOMING_EVENTS, {
    variables: {
      from: today
    }
  });

  const events = useMemo(
    () =>
      data?.events.map(e => (
        <StyledItem key={e.id} onClick={() => onEventClick(e)}>
          {e.name} <span>in {getTimeLeft(e.startTime!)}</span>
        </StyledItem>
      )),
    [data, onEventClick]
  );

  return (
    <StyledWrapper>
      <StyledHeader>Upcoming events</StyledHeader>
      {loading ? <Loader /> : events}
    </StyledWrapper>
  );
};

export default UpcomingEvents;
