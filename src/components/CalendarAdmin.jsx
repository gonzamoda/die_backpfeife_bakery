import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/de";
import dayjs from "dayjs";
import { deDE } from "@mui/x-date-pickers/locales";
import { useState } from "react";

const CalendarAdmin = ({ onDateChange }) => {
  const [dateInput, setDateInput] = useState(dayjs());

  const cambio = (newValue) => {
    setDateInput(newValue);
    onDateChange(newValue.format("DD.MM.YYYY"));
  };

  const isMonday = (date) => {
    const day = date.day();

    return day === 1;
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="de"
      localeText={
        deDE.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DateCalendar
        format="DD-MM-YYYY"
        defaultValue={dateInput}
        shouldDisableDate={isMonday}
        onChange={cambio}
      />
    </LocalizationProvider>
  );
};

export default CalendarAdmin;
