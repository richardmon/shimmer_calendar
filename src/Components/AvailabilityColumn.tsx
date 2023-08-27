import React, { useEffect, useState } from "react";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { useAuth } from "../State/AuthState";
import { db } from "../utils/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

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
  const { user } = useAuth() ?? { user: null };

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

  const createAppointment = async () => {
    if (!selectedSlot || !user) {
      return;
    }
    const selectedSlotInPST = utcToZonedTime(
      zonedTimeToUtc(selectedSlot, usersTimeZone),
      "America/Los_Angeles",
    );
    const meetingEndTime = new Date(selectedSlotInPST);
    meetingEndTime.setMinutes(meetingEndTime.getMinutes() + 30);

    const userDocRef = doc(db, "usermeetings", user.uid);

    // update timezone
    await setDoc(userDocRef, { timezone: usersTimeZone }, { merge: true });

    // store time
    const userMeetingsCollection = collection(
      db,
      "usermeetings",
      user.uid,
      "meeting",
    );
    const newMeetingDoc = doc(userMeetingsCollection);
    await setDoc(newMeetingDoc, {
      timestampStart: selectedSlotInPST, // start time
      timestampEnd: meetingEndTime, // end time
    });
  };

  return !selectedDate ? (
    <div className="h-100 flex justify-center items-center">
      <p className="font-bold text-lg">Select a valid date</p>
    </div>
  ) : (
    <div className="pt-48">
      <h1 className="mb-4 text-center bold">Select time slot</h1>
      <ul className="flex flex-col justify-center items-center">
        {slotsInUserTimeZone.map((slot, index) => (
          <li key={index} className="mb-2">
            <button
              className="p-2 border rounded"
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
            onClick={() => createAppointment()}
            className="my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Appointment{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default AvailabiltyColumn;
