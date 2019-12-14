import React, { useCallback } from "react";
import styled from "styled-components";

interface OwnProps {
  autofocus?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement;
  placeholder?: string;
  value: string;
  style?: React.CSSProperties;
  className?: string;
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

  &:hover:not(:disabled) {
    border-bottom: 2px solid #c4c4c5;
  }

  &:focus {
    border-bottom: 2px solid #4260cc;
  }

  &:disabled {
    background: transparent;
    color: rgba(0, 0, 0, 0.38);
    ::placeholder {
      color: rgba(0, 0, 0, 0.38);
    }
  }
`;

const Input = ({
  value,
  placeholder,
  icon,
  autofocus,
  disabled,
  style,
  className,
  onChange
}: OwnProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = event.target.value;
      onChange(eventValue);
    },
    [onChange]
  );

  return (
    <InputWrapper style={style} className={className}>
      {icon}
      <StyledInput
        disabled={disabled}
        autoFocus={autofocus}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default Input;
