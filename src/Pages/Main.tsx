import { useEffect, useState } from "react";
import { useAuth } from "../State/AuthState";
import Calendar from "../Components/Calendar";
import AvailabiltyColumn from "../Components/AvailabilityColumn";

function Main() {
  const [selectedDate, setSelectedDay] = useState<Date | null>(null);

  return (
    <div className="h-screen flex columns-2">
      <div className="h-full w-4/6">
        <div className="h-full flex justify-center items-center">
          <Calendar setSelectedDay={(day) => setSelectedDay(day)} />
        </div>
      </div>
      <div className="h-screen w-2/6 overflow-y-auto">
        <div className="h-full flex justify-center items-center">
          <AvailabiltyColumn
            selectedDate={selectedDate ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
