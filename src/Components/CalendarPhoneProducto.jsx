import React, { useEffect, useState } from "react";
import { Calendar, DateObject, getAllDatesInRange } from "react-multi-date-picker";

import "./CalendarProductoStyles.css";

const CalendarPhoneProducto = ({ funcion, variable, rangoReservas }) => {
    // const [value, setValue] = useState([null, null]);
    // const [ignoreList, setIgnoreList] = useState([]);
    const [values, setValues] = useState([]);
  let date1 = values[0]?.format?.("D/MM/YYYY");
  let date2 = values[1]?.format?.("D/MM/YYYY");
  // let arr = [date1, date2];
  // let dias = [
  //   {
  //     start: "2023-05-01",
  //     end: "2023-05-05",
  //   },
  //   {
  //     start: "2023-05-10",
  //     end: "2023-05-18",
  //   },
  // ];
  useEffect(() => {
    funcion({
      ...variable,
      checkInProducto: date1,
      checkOutProducto: date2,
    });
    // setIgnoreList(
    //   dias.map((dia) => {
    //     return {
    //       start: new DateObject(dia.start),
    //       end: new DateObject(dia.end),
    //     };
    //   })
    // );
  }, [values]);
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
  return (
    <div className="calendarioProducto">
      <Calendar
        onChange={hadnleChange}
        range
        minDate={new DateObject()}
        mapDays={mapDays}
        className="custom-calendarProducto"
        weekDays={weekDays}
        numberOfMonths={1}
        months={months}
        hideYear={true}
        rangeHover
      />
    </div>
  );
  function hadnleChange([firstDate, secondDate]) {
    const allDates = getAllDatesInRange([firstDate, secondDate]);

    const isAllDatesValid = allDates?.every((date) => checkDate(date));

    function checkDate(date) {
      const isFirstDateValid = rangoReservas.every(
        ({ start, end }) => !isBetweenDates(date, start, end)
      );

      const isSecondDateValid = rangoReservas.every(
        ({ start, end }) => !isBetweenDates(date, start, end)
      );

      return isFirstDateValid && isSecondDateValid;
    }
    if (!isAllDatesValid) {
      setValues([new DateObject(firstDate)]);
    } else {
      setValues([firstDate, secondDate]);
    }
  }

  function mapDays({ date }) {
    const isDateValid = rangoReservas.every(
      ({ start, end }) => !isBetweenDates(date, start, end)
    );

    if (!isDateValid) {
      const isFirst = rangoReservas.some(
        ({ start }) => start.format() === date.format()
      );
      const isLast = rangoReservas.some(
        ({ end }) => end.format() === date.format()
      );

      return {
        disabled: true,
        style: {
          color: "#ccc",
          borderRadius: isFirst ? "50% 0 0 50%" : isLast ? "0 50% 50% 0" : 0,
          left: isFirst ? "3px" : 0,
          right: isLast ? "3px" : 0,
          // you can set bottom & top to 0
          // top: 0,
          // bottom: 0
        },
      };
    }
  }
  function isBetweenDates(date, start, end) {
    if (!date) return false;
  
    return date >= start && date <= new DateObject(end).add(1, "day");
  }
};




export default CalendarPhoneProducto