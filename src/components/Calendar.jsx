import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/de";
import dayjs from "dayjs";
import { deDE } from "@mui/x-date-pickers/locales";
import { useState } from "react";

const Calendar = ({ onDateChange }) => {
  const dayOfDelivery = dayjs().add(2, "day");

  const [dateInput, setDateInput] = useState("");

  const cambio = (newValue) => {
    setDateInput(newValue);
    onDateChange(newValue.format("DD.MM.YYYY"));
  };

  const maxDayOfDelivery = dayjs().add(10, "day");
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
      <DemoItem label="Picking up date">
        <MobileDatePicker
          format="DD-MM-YYYY"
          defaultValue={dayOfDelivery}
          minDate={dayOfDelivery}
          maxDate={maxDayOfDelivery}
          disablePast
          shouldDisableDate={isMonday}
          value={dateInput}
          onChange={cambio}
        />
      </DemoItem>
    </LocalizationProvider>
  );
};

export default Calendar;
