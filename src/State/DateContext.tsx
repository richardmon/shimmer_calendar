import { ReactNode, createContext, useContext, useState } from "react";

interface AppointmentContextType {
  appointmentDate: Date | null;
  setAppointmentDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);

  return (
    <AppointmentContext.Provider
      value={{ appointmentDate, setAppointmentDate }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within a AppointmentProvider");
  }
  return context;
};
