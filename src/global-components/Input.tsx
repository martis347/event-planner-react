import React, { useCallback } from "react";
import styled from "styled-components";

interface OwnProps {
  autofocus?: boolean;
  icon?: React.ReactElement;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const InputWrapper = styled.span`
  display: flex;

  svg {
    width: 16px;
    margin-right: 12px;
  }
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid #f6f6f7;
  transition: 0.4s all;
  margin: 16px 0;
  cursor: text;

  width: 100%;
  font-size: 16px;

  &:hover {
    border-bottom: 2px solid #c4c4c5;
  }

  &:focus {
    border-bottom: 2px solid #4260cc;
  }
`;

const Input = ({ value, placeholder, icon, autofocus, onChange }: OwnProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = event.target.value;
      onChange(eventValue);
    },
    [onChange]
  );

  return (
    <InputWrapper>
      {icon}
      <StyledInput
        autoFocus={autofocus}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default Input;
