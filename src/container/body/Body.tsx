import React from "react";
import CreateButton from "./create-button/CreateButton";
import SmallCalendar from "./small-calendar/SmallCalendar";
import UpcomingEvents from "./upcoming-events/UpcomingEvents";
import FullCalendar from "./full-calendar/FullCalendar";
import styled from "styled-components";

const BodyWrapper = styled.div`
  display: flex;
  height: calc(100% - 60px);
  width: 95%;
`;
const LeftSideWrapper = styled.div`
  min-width: 250px;
  height: 100%;
  border-right: 1px solid lightgray;
  padding: 0 12px;
`;
const RightSideWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Body = () => {
  return (
    <BodyWrapper>
      <LeftSideWrapper>
        <CreateButton />
        <SmallCalendar />
        <UpcomingEvents />
      </LeftSideWrapper>
      <RightSideWrapper>
        <FullCalendar />
      </RightSideWrapper>
    </BodyWrapper>
  );
};

export default Body;
