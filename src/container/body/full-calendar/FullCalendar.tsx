import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { startOfMonth, getMonth, addMonths } from "date-fns";
import { addDays, addWeeks } from "date-fns/esm";
import Row from "./Row";
import DaysTextsRow from "./DaysTextsRow";
import CalendarNavigation from "./CalendarNavigation";
import { Event } from "models";

interface OwnProps {
  events: Event[];
  onEventCreate: (date: Date) => void;
  onEventEdit: (event: Event) => void;
}

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 0.5px);
  height: calc(100% - 60px);
`;

const daysToNegate = [6, 0, 1, 2, 3, 4, 5];
const FullCalendar = ({ onEventEdit, onEventCreate, events }: OwnProps) => {
  const [selectedDate, setSelectedDate] = useState(startOfMonth(new Date()));
  const currentMonth = useMemo(() => getMonth(selectedDate), [selectedDate]);
  const firstMonday = useMemo(() => {
    const result = addDays(selectedDate, -daysToNegate[selectedDate.getDay()]);

    return result;
  }, [selectedDate]);

  const mondays = useMemo(() => {
    const result: Date[] = [firstMonday];
    let currentMonday = addWeeks(firstMonday, 1);
    while (getMonth(currentMonday) === currentMonth) {
      result.push(currentMonday);
      currentMonday = addWeeks(currentMonday, 1);
    }

    return result;
  }, [firstMonday, currentMonth]);

  const handleSubtractMonth = useCallback(
    () => setSelectedDate(d => addMonths(d, -1)),
    []
  );
  const handleAddMonth = useCallback(
    () => setSelectedDate(d => addMonths(d, 1)),
    []
  );
  const handleDayClick = useCallback(
    (date: Date, eventId?: string) => {
      if (eventId) {
        onEventEdit(events.find(e => e.id === eventId)!);
      } else {
        onEventCreate(date);
      }
    },
    [events, onEventCreate, onEventEdit]
  );

  return (
    <>
      <CalendarNavigation
        selectedDate={selectedDate}
        onNavigateLeft={handleSubtractMonth}
        onNavigateRight={handleAddMonth}
      />
      <CalendarWrapper>
        <DaysTextsRow />
        {mondays.map((monday, index) => (
          <Row
            key={monday.toISOString()}
            events={events}
            startOfWeek={monday}
            currentMonth={currentMonth}
            firstRow={index === 0}
            onClick={handleDayClick}
          />
        ))}
      </CalendarWrapper>
    </>
  );
};

export default FullCalendar;
