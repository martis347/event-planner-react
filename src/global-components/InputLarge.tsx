import React, { useCallback } from "react";
import styled from "styled-components";

interface OwnProps {
  autofocus?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const StyledInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid #f6f6f7;
  transition: 0.4s all;
  margin: 16px 0;

  width: 100%;
  font-size: 19px;

  &:hover {
    border-bottom: 2px solid #c4c4c5;
  }

  &:focus {
    border-bottom: 2px solid #4260cc;
  }
`;

const InputLarge = ({ value, placeholder, autofocus, onChange }: OwnProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = event.target.value;
      onChange(eventValue);
    },
    [onChange]
  );

  return (
    <StyledInput
      autoFocus={autofocus}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputLarge;
