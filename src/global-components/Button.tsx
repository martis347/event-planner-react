import React, { useCallback } from "react";
import styled from "styled-components";

interface OwnProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick: (event: React.MouseEvent) => void;
}

const StyledButton = styled.button<{ isDisabled?: number }>`
  border: none;
  height: 30px;
  border-radius: 6px;
  padding: 0 16px;
  cursor: pointer;
  color: white;
  outline: none;
  margin: 8px 0;
  transition: background 0.2s;

  ${props => {
    if (props.isDisabled) {
      return "background: lightgray !important; cursor: no-drop !important;";
    }

    return `
      background: #4260cc;

      :hover {
        background: #314eb6;
      }

      :active {
        background: #294197;
      }
    `;
  }}
`;

const Button = ({
  children,
  disabled,
  style,
  className,
  onClick
}: OwnProps) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!disabled) {
        onClick(e);
      }
    },
    [disabled, onClick]
  );

  return (
    <StyledButton
      style={style}
      className={className}
      disabled={disabled}
      isDisabled={disabled ? 1 : 0}
      onClick={handleClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
