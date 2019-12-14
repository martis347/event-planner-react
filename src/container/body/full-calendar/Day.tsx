import React, { useMemo, useCallback, useContext } from "react";
import styled from "styled-components";
import {
  format,
  getMonth,
  isSameDay,
  isWithinInterval,
  set,
  parseISO
} from "date-fns";
import { Event } from "models";
import { AuthenticationContext } from "context/AuthenticationContext";

const DayWrapper = styled.div<{
  dayFromCurrentMonth: number;
  isToday: number;
  hasEvent: number;
  clickable: number;
}>`
  width: calc(100% / 7);
  border: 1px solid lightgray;
  margin: -0.5px;
  font-size: 18px;

  :hover {
    background: #fbfcfe;
  }

  ${props =>
    props.clickable &&
    `
    cursor: pointer;
  `}

  ${props =>
    props.hasEvent ? "background: #eceffa !important;" : "background: inherit;"}

  ${props => {
    if (props.isToday) {
      return `
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 4px;
      `;
    }
  }}

  span {
    display: flex;
    justify-content: center;
    padding-top: 6px;

    ${props => {
      let style = "";
      if (!props.dayFromCurrentMonth) {
        style += `
          color: #8a8c8e;
          font-size: 15px;
        `;
      }

      if (props.isToday) {
        style += `
          color: #4260cc;
          font-weight: 500;
          border: 2px solid #4260cc;
          padding: 0;
          width: 23px;
          border-radius: 58px;
        `;
      }

      return style;
    }}
  }
`;

const EventNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

interface OwnProps {
  day: Date;
  events: Event[];
  currentMonth: number;
  onClick: (date: Date, eventId?: string) => void;
}

const getEventEndTime = (event: Event) => {
  if (event.endTime) {
    return set(parseISO(event.endTime!), {
      hours: 23,
      minutes: 59,
      seconds: 59
    });
  }

  return set(parseISO(event.startTime!), {
    hours: 23,
    minutes: 59,
    seconds: 59
  });
};

const getEventStartTime = (event: Event) => {
  return set(parseISO(event.startTime!), {
    hours: 0,
    minutes: 0,
    seconds: 0
  });
};

const Day = ({ day, currentMonth, events, onClick }: OwnProps) => {
  const { showAdminContent } = useContext(AuthenticationContext);
  const dayFromCurrentMonth = useMemo(() => getMonth(day) === currentMonth, [
    day,
    currentMonth
  ]);

  const isToday = useMemo(() => isSameDay(new Date(), day), [day]);
  const event = useMemo(
    () =>
      events.find(e =>
        isWithinInterval(day, {
          start: getEventStartTime(e),
          end: getEventEndTime(e)
        })
      ),
    [day, events]
  );

  const handleClick = useCallback(() => {
    if (event) {
      onClick(day, event.id);
    } else if (showAdminContent) {
      onClick(day, undefined);
    }
  }, [day, event, onClick, showAdminContent]);

  return (
    <DayWrapper
      dayFromCurrentMonth={dayFromCurrentMonth ? 1 : 0}
      isToday={isToday ? 1 : 0}
      hasEvent={event ? 1 : 0}
      clickable={showAdminContent || event ? 1 : 0}
      onClick={handleClick}
    >
      <span>{format(day, "dd")}</span>
      <EventNameWrapper>{event?.name}</EventNameWrapper>
    </DayWrapper>
  );
};

export default Day;
