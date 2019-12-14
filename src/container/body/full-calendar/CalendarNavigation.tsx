import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "icons/regular";

const StyledWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;

  * {
    user-select: none;
  }
`;

const Name = styled.div`
  font-size: 25px;
`;

const Arrows = styled.div`
  padding: 8px 10px 0 0px;
  svg {
    height: 15px;
    width: 15px;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;

    :hover {
      background-color: rgba(32, 33, 36, 0.039);
    }

    :active {
      background-color: #eceffa;
    }
  }
`;

interface OwnProps {
  selectedDate: Date;
  onNavigateLeft: () => void;
  onNavigateRight: () => void;
}

const CalendarNavigation = ({
  selectedDate,
  onNavigateLeft,
  onNavigateRight
}: OwnProps) => {
  return (
    <StyledWrapper>
      <Arrows>
        <ChevronLeft onClick={onNavigateLeft} />
        <ChevronRight onClick={onNavigateRight} />
      </Arrows>
      <Name>{format(selectedDate, "MMMM yyyy")}</Name>
    </StyledWrapper>
  );
};

export default CalendarNavigation;
