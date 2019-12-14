import React, { useMemo } from "react";
import styled from "styled-components";
import { format, getMonth, isSameDay } from "date-fns";

const DayWrapper = styled.div<{ dayFromCurrentMonth: number; isToday: number }>`
  width: calc(100% / 7);
  border: 1px solid lightgray;
  margin: -0.5px;
  font-size: 18px;

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

interface OwnProps {
  day: Date;
  currentMonth: number;
}

const Day = ({ day, currentMonth }: OwnProps) => {
  const dayFromCurrentMonth = useMemo(() => getMonth(day) === currentMonth, [
    day,
    currentMonth
  ]);
  const isToday = useMemo(() => isSameDay(new Date(), day), [day]);

  return (
    <DayWrapper
      dayFromCurrentMonth={dayFromCurrentMonth ? 1 : 0}
      isToday={isToday ? 1 : 0}
    >
      <span>{format(day, "dd")}</span>
    </DayWrapper>
  );
};

export default Day;
