import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { UPCOMING_EVENTS, EventVars, EventData } from "./query";
import {
  differenceInCalendarMonths,
  parseISO,
  differenceInCalendarDays
} from "date-fns";

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

const UpcomingEvents = () => {
  const { data } = useQuery<EventData, EventVars>(UPCOMING_EVENTS, {
    variables: {
      from: today
    }
  });

  const events = useMemo(
    () =>
      data?.events.map(e => (
        <StyledItem key={e.id}>
          {e.name} <span>in {getTimeLeft(e.startTime)}</span>
        </StyledItem>
      )),
    [data]
  );

  return (
    <StyledWrapper>
      <StyledHeader>Upcoming events</StyledHeader>
      {events}
    </StyledWrapper>
  );
};

export default UpcomingEvents;
