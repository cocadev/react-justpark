import React, { useState, useEffect } from "react";
import "../../../calendarSelector.css";
import MomentUtils from "@date-io/moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function CalendarSelector(props) {
  let [selectedDate, handleDateChange] = useState(new Date());

  const onSelect = (date) => {
    handleDateChange(date);
    props.parentCallback(date._d, props.start);
  };

  // this is the same thing as
  // "componentDidUpdate" in class based components
  useEffect(() => {
    if (props.selectedTime !== null) {
      handleDateChange(props.selectedTime);
    }
  }, [props.selectedTime]);

  return (
    <div id="calendar_container">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          value={selectedDate}
          onChange={onSelect}
          ampm={true}
          disablePast={true}
          fullWidth
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default CalendarSelector;
