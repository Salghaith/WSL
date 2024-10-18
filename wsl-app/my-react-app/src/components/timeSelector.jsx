import * as React from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
const TimeSelector = ({ value, setValue, label }) => {
  const handleChange = (newValue) => {
    // Ensure newValue is a valid dayjs object before setting it
    if (newValue && dayjs(newValue).isValid()) {
      setValue(newValue);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={dayjs(value)} // Ensure value is passed as a dayjs object
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};
export default TimeSelector;
