import React, { useEffect, useState } from "react";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { useAppointment } from "../State/DateContext";
import { useNavigate } from "react-router";

// TODO: get time availability from the database

type AvailabiltyColumnProps = {
  selectedDate?: Date;
};

const AvailabiltyColumn: React.FC<AvailabiltyColumnProps> = ({
  selectedDate,
}) => {
  const [slotsInUserTimeZone, setSlotsInUserTimeZone] = useState<Date[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Date>();
  const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { setAppointmentDate } = useAppointment();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedDate) return;
    const timeZonePST = "America/Los_Angeles";

    // Define slots in user's timezone that correspond to 9:00 AM to 3:00 PM in PST
    const startInPST = new Date(selectedDate);
    startInPST.setHours(9, 0, 0, 0);
    const startInUserTimeZone = utcToZonedTime(
      zonedTimeToUtc(startInPST, timeZonePST),
      usersTimeZone,
    );

    const slots = [];
    for (let i = 0; i < 6 * 2; i++) {
      // 6 hours * 2 slots per hour
      const slot = new Date(startInUserTimeZone);
      slot.setMinutes(slot.getMinutes() + i * 30);
      slots.push(slot);
    }

    setSlotsInUserTimeZone(slots);
  }, [usersTimeZone, selectedDate]);

  const handleSlotSelection = (index: number) => {
    const selectedSlotInUserTimeZone = slotsInUserTimeZone[index];
    const selectedSlotInPST = utcToZonedTime(
      zonedTimeToUtc(selectedSlotInUserTimeZone, usersTimeZone),
      "America/Los_Angeles",
    );
    console.log("selectedSlotInPST", selectedSlotInPST);
    console.log(selectedSlotInUserTimeZone);
    setSelectedSlot(selectedSlotInUserTimeZone);
  };

  const goToConfirmation = async () => {
    if (!selectedSlot) {
      return;
    }
    const selectedSlotInPST = utcToZonedTime(
      zonedTimeToUtc(selectedSlot, usersTimeZone),
      "America/Los_Angeles",
    );
    setAppointmentDate(selectedSlotInPST);
    navigate("/confirmation");
  };

  return !selectedDate ? (
    <div className="flex justify-center items-center">
      <p className="font-bold text-lg">Select a valid date</p>
    </div>
  ) : (
    <div className="pt-2">
      <h1 className="mb-4 text-center bold">Select time slot</h1>
      <ul className="flex flex-col justify-center items-center">
        {slotsInUserTimeZone.map((slot, index) => (
          <li key={index} className="mb-2">
            <button
              className={`p-2 border rounded ${
                selectedSlot === slot ? "bg-shimmer-yellow" : ""
              } `}
              onClick={() => handleSlotSelection(index)}
            >
              {format(slot, "HH:mm a", { timeZone: usersTimeZone })}
            </button>
          </li>
        ))}
      </ul>
      <div className="justify-center items-center">
        {selectedSlot && (
          <button
            onClick={() => goToConfirmation()}
            className="my-8 bg-shimmer-yellow text-black py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AvailabiltyColumn;
