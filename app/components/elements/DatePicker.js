import React, { useState } from 'react';
import { SingleDatePicker, SingleDatePickerShape } from 'react-dates';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import noop from 'lodash/noop';
import styled from 'styled-components';

import { DatePicker as StyledDatePickerBase } from './InputStyles';
import { IconButton } from './IconButton';

import {
  colors,
  fontSizes,
  radii,
  shadows,
  space,
} from '../../themes/baseTheme';

const StyledDatePicker = styled(StyledDatePickerBase)`
  .SingleDatePickerInput {
    border-radius: ${radii.input}px;
    border-color: ${colors.border.default};
  }

  .SingleDatePicker_picker {
    box-shadow: ${shadows.small};
    margin-top: ${space[3]}px;
  }

  .SingleDatePickerInput_clearDate {
    padding: 0;
    display: flex;

    .MuiSvgIcon-root {
      width: ${fontSizes[3]}px;
    }
  }
`;

export const DatePicker = props => {
  const {
    date: dateProp,
    focused: focusedProp,
    isOutsideRange,
    onDateChange,
    onFocusChange,
    ...datePickerProps
  } = props;
  const [date, setDate] = useState(dateProp);
  const [focused, setFocused] = useState(focusedProp);

  return (
    <StyledDatePicker>
      <SingleDatePicker
        date={date}
        onDateChange={newDate => setDate(newDate) && onDateChange(newDate)}
        focused={focused}
        onFocusChange={({ focused: newFocused }) => {
          setFocused(newFocused);
          onFocusChange(newFocused);
        }}
        id={props.id}
        numberOfMonths={1}
        placeholder="mm/dd/yyyy"
        displayFormat="MMM D, YYYY"
        verticalSpacing={0}
        navNext={<IconButton variant="icons.static" label="next month" icon={NavigateNextRoundedIcon} />}
        navPrev={<IconButton variant="icons.static" label="previous month" icon={NavigateBeforeRoundedIcon} />}
        customCloseIcon={<IconButton variant="icons.static" label="clear dates" icon={CloseRoundedIcon} />}
        isOutsideRange={isOutsideRange}
        daySize={36}
        enableOutsideDays
        hideKeyboardShortcutsPanel
        showClearDate
        {...datePickerProps}
      />
    </StyledDatePicker>
  );
};

DatePicker.propTypes = SingleDatePickerShape;

DatePicker.defaultProps = {
  date: null,
  focused: false,
  onDateChange: noop,
  onFocusChange: noop,
  isOutsideRange: noop,
};

export default DatePicker;
