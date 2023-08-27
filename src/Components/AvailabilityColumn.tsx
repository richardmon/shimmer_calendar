import React, { useEffect, useState } from "react";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { set } from "date-fns";

// TODO: get time availability from the database

type AvailabiltyColumnProps = {
  selectedDate?: Date;
};

const AvailabiltyColumn: React.FC<AvailabiltyColumnProps> = ({
  selectedDate,
}) => {

  if (!selectedDate) {
    return (
      <div className="h-100 flex justify-center items-center">
        <p className="font-bold text-lg">Select a valid date</p>
      </div>
    );
  }

  const [slotsInUserTimeZone, setSlotsInUserTimeZone] = useState<Date[]>([]);
  const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const timeZonePST = 'America/Los_Angeles';
    
    // Define slots in user's timezone that correspond to 9:00 AM to 3:00 PM in PST
    const startInPST = new Date();
    startInPST.setHours(9, 0, 0, 0);
    const startInUserTimeZone = utcToZonedTime(zonedTimeToUtc(startInPST, timeZonePST), usersTimeZone);

    const slots = [];
    for (let i = 0; i < 6*2; i++) { // 6 hours * 2 slots per hour
      const slot = new Date(startInUserTimeZone);
      slot.setMinutes(slot.getMinutes() + i * 30);
      slots.push(slot);
    }
    
    setSlotsInUserTimeZone(slots);
  }, [usersTimeZone]);

  const handleSlotSelection = (index: number) => {
    const selectedSlotInUserTimeZone = slotsInUserTimeZone[index];
    const selectedSlotInPST = utcToZonedTime(zonedTimeToUtc(selectedSlotInUserTimeZone, usersTimeZone), 'America/Los_Angeles');
    alert(`You've selected the ${format(selectedSlotInPST, 'HH:mm a', { timeZone: 'America/Los_Angeles' })} slot in PST.`);
  };


  return (
    <div className="pt-48">
      <h1 className="mb-4 text-center bold">Select time slot</h1>
      <ul className="flex flex-col justify-center items-center">
        {slotsInUserTimeZone.map((slot, index) => (
          <li key={index} className="mb-2">
            <button
              className={`p-2 border rounded`}
              onClick={() => handleSlotSelection(index)}
            >
            {format(slot, 'HH:mm a', { timeZone: usersTimeZone })}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailabiltyColumn;
