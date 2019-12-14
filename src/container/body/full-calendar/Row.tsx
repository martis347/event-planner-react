import React, { useCallback } from "react";
import styled from "styled-components";
import Day from "./Day";
import { addDays } from "date-fns";
import { Event } from "models";

const RowWrapper = styled.div<{ firstRow: number }>`
  display: flex;
  height: 100%;
`;

interface OwnProps {
  events: Event[];
  startOfWeek: Date;
  currentMonth: number;
  firstRow: boolean;
  onClick: (date: Date, eventId?: string) => void;
}

const Row = ({
  startOfWeek,
  currentMonth,
  firstRow,
  events,
  onClick
}: OwnProps) => {
  const renderDay = useCallback(
    (dayOfWeek: number) => (
      <Day
        key={dayOfWeek}
        events={events}
        day={addDays(startOfWeek, dayOfWeek)}
        currentMonth={currentMonth}
        onClick={onClick}
      />
    ),
    [currentMonth, events, startOfWeek, onClick]
  );

  return (
    <RowWrapper firstRow={firstRow ? 1 : 0}>
      {[0, 1, 2, 3, 4, 5, 6].map(renderDay)}
    </RowWrapper>
  );
};

export default Row;
