import React from "react";
import styled from "styled-components";

const RowWrapper = styled.div`
  display: flex;
  height: 30px;
`;

const DayWrapper = styled.div`
  width: calc(100% / 7);
  border: 1px solid lightgray;
  margin: -0.5px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
`;

const DaysTextsRow = () => {
  return (
    <RowWrapper>
      <DayWrapper>Mon</DayWrapper>
      <DayWrapper>Tue</DayWrapper>
      <DayWrapper>Web</DayWrapper>
      <DayWrapper>Thu</DayWrapper>
      <DayWrapper>Fri</DayWrapper>
      <DayWrapper>Sat</DayWrapper>
      <DayWrapper>Sun</DayWrapper>
    </RowWrapper>
  );
};

export default DaysTextsRow;
