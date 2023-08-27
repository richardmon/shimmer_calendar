import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Calendar from "../Components/Calendar";
import AvailabiltyColumn from "../Components/AvailabilityColumn";
import LayoutWithSidebar from "../Layout/LayoutWithSideBar";
import { useNavigate } from "react-router";
import { useAppointment } from "../State/DateContext";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useAuth } from "../State/AuthState";
import { format } from "date-fns-tz";

function checkExistingMeeting(appointmentDate: Date) {
  const currentDate = new Date();
  const future = appointmentDate > currentDate;
  const timeDifference = appointmentDate.getTime() - currentDate.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  const cancelable = hoursDifference > 24;

  return { future, cancelable };
}

function Main() {
  const navigate = useNavigate();
  const { appointmentDate } = useAppointment();
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  const [existingMeeting, setExistingMeeting] = useState<Date | null>(null);
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const { user } = useAuth() ?? { user: null };

  useEffect(() => {
    const meetingRef = collection(db, `usermeetings/${user?.uid}/meeting`);
    const q = query(
      meetingRef,
      where("cancel", "!=", true),
      orderBy("cancel"),
      orderBy("timestampStart", "desc"),
      limit(1),
    );
    getDocs(q).then((snapshot) => {
      console.log(snapshot.docs);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const meetingDate = doc.data().timestampStart.toDate();
        const { future } = checkExistingMeeting(meetingDate);
        if (future) {
          setExistingMeeting(meetingDate);
          setMeetingId(doc.id);
        } else {
          setExistingMeeting(null);
        }
      }
      setLoadingMeetings(false);
    });
  }, [user, appointmentDate]);

  useEffect(() => {
    if (appointmentDate) {
      navigate("/confirmation");
    } else {
      setLoadingMeetings(true);
    }
  }, [appointmentDate]);

  return loadingMeetings ? (
    <div> Loading </div>
  ) : (
    <LayoutWithSidebar title="Calendar">
      {existingMeeting ? (
        <ShowExsistingAppointment
          appointmentDate={existingMeeting}
          cancelable={checkExistingMeeting(existingMeeting).cancelable}
          meetingId={meetingId ?? ""}
          userId={user?.uid ?? ""}
          setExistingMeeting={setExistingMeeting}
        />
      ) : (
        <DisplayCalendar />
      )}
    </LayoutWithSidebar>
  );
}

const DisplayCalendar = () => {
  const [selectedDate, setSelectedDay] = useState<Date | null>(null);
  return (
    <div className="h-100 flex columns-2">
      <div className="w-4/6">
        <div className="flex justify-center items-center">
          <Calendar setSelectedDay={(day) => setSelectedDay(day)} />
        </div>
      </div>
      <div className="w-2/6 overflow-y-auto">
        <div className="flex justify-center items-center">
          <AvailabiltyColumn selectedDate={selectedDate ?? undefined} />
        </div>
      </div>
    </div>
  );
};

const ShowExsistingAppointment = ({
  appointmentDate,
  cancelable,
  meetingId,
  userId,
  setExistingMeeting,
}: {
  appointmentDate: Date;
  cancelable: boolean;
  meetingId: string;
  userId: string;
  setExistingMeeting: Dispatch<SetStateAction<Date | null>>;
}) => {
  const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const cancelMeeting = async () => {
    const meetingRef = doc(db, `usermeetings/${userId}/meeting/${meetingId}`);

    try {
      await updateDoc(meetingRef, { cancel: true });
      console.log("Cancel field added/updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
    setExistingMeeting(null);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      You have an appointment set for the{" "}
      {format(appointmentDate ?? new Date(), "MM-dd-yyyy HH:mm", {
        timeZone: usersTimeZone,
      })}
      {cancelable && (
        <button
          onClick={() => cancelMeeting()}
          className="my-8 bg-shimmer-yellow text-black py-2 px-4 rounded"
        >
          Cancel appointment
        </button>
      )}
    </div>
  );
};

export default Main;
