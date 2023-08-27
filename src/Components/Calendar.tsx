import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarProps = {
  setSelectedDay: (day: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ setSelectedDay }) => {
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());

  const today = new Date();
  const lastSelectableDay = new Date(today);
  lastSelectableDay.setDate(today.getDate() + 7);

  const isOutsideSelectableRange = (date: Date) => {
    return date <= today || date > lastSelectableDay;
  };

  const handleClickDay = (index: number) => {
    const currentDate = new Date(displayedYear, displayedMonth, index + 1);
    if (!isOutsideSelectableRange(currentDate)) {
      setSelectedDay(currentDate);
      setClickedDate(currentDate);
    }
  };

  const handlePrevMonth = () => {
    if (displayedMonth === 0) {
      setDisplayedMonth(11);
      setDisplayedYear(displayedYear - 1);
    } else {
      setDisplayedMonth(displayedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayedMonth === 11) {
      setDisplayedMonth(0);
      setDisplayedYear(displayedYear + 1);
    } else {
      setDisplayedMonth(displayedMonth + 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span className="text-lg font-semibold">
          {new Date(displayedYear, displayedMonth).toLocaleString("default", {
            month: "long",
          })}
        </span>
        <span className="text-lg font-semibold">{displayedYear}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold text-black">
            {day}
          </div>
        ))}
        {Array.from({ length: new Date(displayedYear, displayedMonth + 1, 0).getDate() }).map((_, index) => (
          <div className="flex justify-center items-center" key={index}>
            <div
              className={`w-10 h-10 flex items-center justify-center text-center border rounded-full
              ${
                isOutsideSelectableRange(new Date(displayedYear, displayedMonth, index + 1))
                  ? "opacity-50 cursor-default"
                  : "hover:bg-blue-100 cursor-pointer"
              }
              ${clickedDate?.getDate() === index + 1 ? "bg-blue-400 hover:bg-blue-500" : ""}
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
