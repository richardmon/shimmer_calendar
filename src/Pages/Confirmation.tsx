import React, { useEffect } from "react";
import LayoutWithSideBar from "../Layout/LayoutWithSideBar";
import { useAuth } from "../State/AuthState";
import { useAppointment } from "../State/DateContext";
import { format } from "date-fns-tz";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useNavigate } from "react-router";

const Confirmation: React.FC = () => {
  const { user } = useAuth() ?? { user: null };
  const { appointmentDate, setAppointmentDate } = useAppointment();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appointmentDate) {
      navigate("/");
    }
  }, [appointmentDate]);

  const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const createAppointment = async () => {
    if (!appointmentDate || !user) {
      return;
    }
    const meetingEndTime = new Date(appointmentDate);
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
      timestampStart: appointmentDate, // start time
      timestampEnd: meetingEndTime, // end time
      cancel: false,
    });
    setAppointmentDate(null);
  };

  const cancelAppointment = () => {
    setAppointmentDate(null);
  };

  return (
    <LayoutWithSideBar title="Confirmation">
      <div className="h-100 flex flex-col justify-center items-center">
        <p className="bold text-xl text-center">
          Do you want to set an appointment for the
          {" " +
            format(appointmentDate ?? new Date(), "MM-dd-yyyy HH:mm", {
              timeZone: usersTimeZone,
            })}
        </p>
        <p className="text-gray-600">{user?.email}</p>
        <div className="w-52 flex justify-center items-center space-x-10">
          <button
            onClick={() => cancelAppointment()}
            className="my-8 bg-gray-200 text-black py-2 px-4 rounded"
          >
            Cancel Appointment
          </button>
          <button
            onClick={() => createAppointment()}
            className="my-8 bg-shimmer-yellow text-black py-2 px-4 rounded"
          >
            Create Appointment
          </button>
        </div>
      </div>
    </LayoutWithSideBar>
  );
};

export default Confirmation;
