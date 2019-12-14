import React, { useCallback } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import styled from "styled-components";
import { isValid } from "date-fns";

interface OwnProps {
  icon?: React.ReactElement;
  fromDate: Date | null;
  toDate: Date | null;
  onFromChange: (value: Date | null) => void;
  onToChange: (value: Date | null) => void;
  onError?: (hasError: boolean) => void;
}

const InputWrapper = styled.span`
  display: flex;
  padding-top: 8px;
  & > svg {
    min-width: 16px;
    margin-right: 12px;
  }

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid #c4c4c5;
  }

  .MuiInput-underline:before {
    border-bottom: 2px solid #f6f6f7;
  }

  .MuiFormControl-root {
    svg {
      width: 18px;
      height: 18px;
    }
    button {
      padding: 0px;
    }
  }
`;

const DateTimeRange = ({
  fromDate,
  icon,
  toDate,
  onToChange,
  onFromChange,
  onError
}: OwnProps) => {
  const handleFromChange = useCallback(
    (date: Date | null) => {
      onFromChange(date);
      if (isValid(date)) {
        onToChange(date);
      }
    },
    [onToChange, onFromChange]
  );

  const handleError = useCallback(
    (error: React.ReactNode) => {
      onError?.(!!error);
    },
    [onError]
  );

  return (
    <InputWrapper>
      {icon}
      <KeyboardDateTimePicker
        autoOk
        label="From"
        value={fromDate}
        onChange={handleFromChange}
        format="yyyy-MM-dd HH:mm"
        ampm={false}
        hideTabs
        onError={handleError}
      />
      <div style={{ width: 20 }} />
      <KeyboardDateTimePicker
        autoOk
        label="To"
        value={toDate}
        onChange={onToChange}
        minDate={fromDate}
        format="yyyy-MM-dd HH:mm"
        ampm={false}
        hideTabs
        onError={handleError}
      />
    </InputWrapper>
  );
};

export default DateTimeRange;
