import React, { useCallback } from "react";
import styled from "styled-components";

interface OwnProps {
  autofocus?: boolean;
  disabled?: boolean;
  rows?: number;
  icon?: React.ReactElement;
  placeholder?: string;
  value: string;
  onEnter?: () => void;
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

  &:hover:not(:disabled) {
    border-bottom: 2px solid #c4c4c5;
  }

  &:focus {
    border-bottom: 2px solid #4260cc !important;
  }

  &:disabled {
    background: transparent;
    color: rgba(0, 0, 0, 0.38);
    ::placeholder {
      color: rgba(0, 0, 0, 0.38);
    }
  }
`;

const TextArea = ({
  value,
  disabled,
  autofocus,
  placeholder,
  icon,
  rows = 1,
  onChange,
  onEnter
}: OwnProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const eventValue = event.target.value;
      onChange(eventValue);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.ctrlKey && event.key === "Enter") {
        onEnter?.();
      }
    },
    [onEnter]
  );

  return (
    <InputWrapper>
      {icon}
      <StyledArea
        disabled={disabled}
        autoFocus={autofocus}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </InputWrapper>
  );
};

export default TextArea;
