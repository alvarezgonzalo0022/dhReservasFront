import React, { useEffect, useState } from "react";
import {
  Calendar,
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";
import "./CalendarProductoStyles.css";

const CalendarDesktopProducto = ({ funcion, variable, rangoReservas }) => {
  // const [value, setValue] = useState([null, null]);
  const [values, setValues] = useState([]);
  // const [ignoreList, setIgnoreList] = useState([]);
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
    })
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
        value={values}
        minDate={new DateObject()}
        mapDays={mapDays}
        //         mapDays={({ date }) => {
        //           if (date < new DateObject())
        //             return {
        //               disabled: true,
        //               style: { color: "#ccc" },
        //             };
        //           let dias = ["3/24/2023", "4/20/2023"];
        //           let dia1 = "4/1/2023";
        //           let dia2 = "4/30/2023";
        //           let props = {};
        //           var fechaInicio = new Date(dia1);
        //           var fechaFin = new Date(dia2);
        //           let fechas = [];
        //           while (fechaFin.getTime() >= fechaInicio.getTime()) {
        //             fechas.push((fechaInicio.getMonth() + 1)  + '/' + (fechaInicio.getDate() ) + '/' + fechaInicio.getFullYear())
        //             fechaInicio.setDate(fechaInicio.getDate() + 1);
        //             // console.log(
        //             //   fechaInicio.getFullYear() +
        //             //     "/" +
        //             //     (fechaInicio.getMonth() + 1) +
        //             //     "/" +
        //             //     fechaInicio.getDate()
        //             // );
        //           }
        // //           console.log(dias.includes(date.format('M/D/YYYY')))
        // console.log(fechas)
        // // console.log(dias)
        //           if (fechas.includes(date.format('M/D/YYYY'))) {
        //             props.disabled = true;
        //             props.style = { color: "#ccc" };
        //             return props;
        //           }
        //         }}
        className="custom-calendarProducto"
        weekDays={weekDays}
        numberOfMonths={3}
        months={months}
        hideYear={true}
        rangeHover
      />
      <div
        style={{
          borderLeft: "1px solid #A8A8A8",
          position: "absolute",
          height: "265px",
          width: "10px",
          left: "33%",
          top: "16px",
        }}
      ></div>
      <div
        style={{
          borderLeft: "1px solid #A8A8A8",
          position: "absolute",
          height: "265px",
          width: "10px",
          right: "33%",
          top: "16px",
        }}
      ></div>
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


export default CalendarDesktopProducto;
