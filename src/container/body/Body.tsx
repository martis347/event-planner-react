import React from "react";
import CreateButton from "./create-button/CreateButton";
import UpcomingEvents from "./upcoming-events/UpcomingEvents";
import PastEvents from "./past-events/PastEvents";
import FullCalendar from "./full-calendar/FullCalendar";
import styled from "styled-components";

const BodyWrapper = styled.div`
  display: flex;
  height: calc(100% - 60px);
`;
const LeftSideWrapper = styled.div`
  min-width: 250px;
  height: 100%;
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
        <UpcomingEvents />
        <PastEvents />
      </LeftSideWrapper>
      <RightSideWrapper>
        <FullCalendar />
      </RightSideWrapper>
    </BodyWrapper>
  );
};

export default Body;
