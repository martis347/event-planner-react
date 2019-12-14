import React from "react";
import styled from "styled-components";
import { CalendarPlus } from "icons/regular";

const StyledButton = styled.button`
  height: 48px;
  width: 150px;
  background: none;
  border: none;
  color: #3c4043;
  margin: 16px 0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);

  :hover {
    cursor: pointer;
    background-color: #fbfcfe;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.1),
      0 8px 10px 1px rgba(0, 0, 0, 0.08), 0 3px 14px 2px rgba(0, 0, 0, 0.05);
  }

  :active {
    background-color: #eceffa;
  }

  svg {
    width: 23px;
    margin-right: 10px;
    color: #182659;
  }
`;

const CreateButton = () => {
  return (
    <StyledButton>
      <CalendarPlus />
      Create
    </StyledButton>
  );
};

export default CreateButton;