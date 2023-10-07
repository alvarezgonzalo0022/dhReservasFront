import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import "./CalendarStyles.css";

const CalendarPhone = ({ funcion, variable }) => {
  const [value, setValue] = useState([null, null]);
  let date1 = value[0]?.format?.("D/MM/YYYY");
  let date2 = value[1]?.format?.("D/MM/YYYY");
  let arr = [date1, date2];
  useEffect(() => {
    funcion({
      ...variable,
      checkIn: date1,
      checkOut: date2,
    });
  }, [value]);
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const MyPluggin = ({ DatePicker }) => {
    return (
      <div className="botonPluggin">
        <button onClick={() => DatePicker.closeCalendar()}>Aplicar</button>
      </div>
    );
  };
  return (
    <div className="calendario">
      <DatePicker
        onChange={(newValue) => {
          setValue(newValue);
        }}
        format="D MMM."
        range
        minDate={new DateObject()}
        className="custom-calendar"
        arrow={<div style={{ height: "5px" }}></div>}
        weekDays={weekDays}
        numberOfMonths={1}
        months={months}
        hideYear={true}
        rangeHover
        calendarPosition="bottom"
        plugins={[<MyPluggin position="bottom" />]}
        render={(value, openCalendar) => {
          let from = value[0] || "";
          let to = value[1] || "";
          value = from && to ? " " + from + " - " + to : from;
          return (
            <div className="calendarioNuevo">
              <FontAwesomeIcon icon={faCalendar} className="iconoCalendario" />
              <input
                onFocus={openCalendar}
                value={value}
                readOnly
                className="calendarioInput"
                placeholder="Check in - Check out"
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarPhone;
