import { useState } from "react";
import { useAuth } from "../State/AuthState";
import Calendar from "../Components/Calendar";

function Main() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { user } = useAuth() ?? { user: null };

  return (
    <div>
      {selectedDay}
      <Calendar setSelectedDay={(day) => setSelectedDay(day)} />
    </div>
  );
}

export default Main;
