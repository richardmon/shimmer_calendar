import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarProps = {
  setSelectedDay: (day: number) => void;
};

const Calendar: React.FC<CalendarProps> = ({setSelectedDay}) => {
  const [clickedDay, setClickDay]  = useState<number | null>(null);

  const today = new Date();
  const daysInCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const daysInPreviousMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  ).getDay();

  console.log(daysInPreviousMonth);
  console.log(firstDayOfMonth);

  const daysFromPrevMonthToShow = Array.from({ length: firstDayOfMonth }).map(
    (_, index) => daysInPreviousMonth - firstDayOfMonth + index + 1,
  );
  console.log(daysFromPrevMonthToShow);

  const isBeforeToday = (day: number) => {
      return today.getDate() > day;
  }

  const handleClickDay = (index:number) => {
    if (!isBeforeToday(index+1)){
        setSelectedDay(index+1);
        setClickDay(index);
      }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">
          {today.toLocaleString("default", { month: "long" })}
        </span>
        <span className="text-lg font-semibold">{today.getFullYear()}</span>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold text-black">
            {day}
          </div>
        ))}
        {daysFromPrevMonthToShow.map((day) => (
          <div className="flex justify-center items-center">
            <div
              key={day}
              className="w-10 h-10 flex items-center justify-center text-center text-gray-400 border rounded-full"
            >
              {day}
            </div>
          </div>
        ))}
        {Array.from({ length: daysInCurrentMonth }).map((_, index) => (
          <div className="flex justify-center items-center">
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center text-center border rounded-full
              ${isBeforeToday(index+1) ? 'opacity-50 cursor-default' : 'hover:bg-blue-100 cursor-pointer'}
              ${clickedDay === index ? 'bg-blue-400 hover:bg-blue-500' : ""}
              `}
              onClick={() => handleClickDay(index)}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
