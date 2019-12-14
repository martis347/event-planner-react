import React, { useCallback } from "react";
import styled from "styled-components";

interface OwnProps {
  autofocus?: boolean;
  rows?: number;
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

const StyledArea = styled.textarea`
  outline: none;
  border: none;
  border-bottom: 2px solid #f6f6f7;
  transition: 0.4s border;
  margin: 16px 0;

  width: 100%;
  font-size: 16px;

  &:hover {
    border-bottom: 2px solid #c4c4c5;
  }

  &:focus {
    border-bottom: 2px solid #4260cc;
  }
`;

const TextArea = ({
  value,
  placeholder,
  icon,
  rows = 1,
  onChange
}: OwnProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const eventValue = event.target.value;
      onChange(eventValue);
    },
    [onChange]
  );

  return (
    <InputWrapper>
      {icon}
      <StyledArea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default TextArea;
