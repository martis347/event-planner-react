import React from "react";
import styled from "styled-components";
import Day from "./Day";
import { addDays } from "date-fns";

const RowWrapper = styled.div<{ firstRow: number }>`
  display: flex;
  height: 100%;
`;

interface OwnProps {
  startOfWeek: Date;
  currentMonth: number;
  firstRow: boolean;
}

const Row = ({ startOfWeek, currentMonth, firstRow }: OwnProps) => {
  return (
    <RowWrapper firstRow={firstRow ? 1 : 0}>
      <Day day={startOfWeek} currentMonth={currentMonth} />
      <Day day={addDays(startOfWeek, 1)} currentMonth={currentMonth} />
      <Day day={addDays(startOfWeek, 2)} currentMonth={currentMonth} />
      <Day day={addDays(startOfWeek, 3)} currentMonth={currentMonth} />
      <Day day={addDays(startOfWeek, 4)} currentMonth={currentMonth} />
      <Day day={addDays(startOfWeek, 5)} currentMonth={currentMonth} />
      <Day day={addDays(startOfWeek, 6)} currentMonth={currentMonth} />
    </RowWrapper>
  );
};

export default Row;
