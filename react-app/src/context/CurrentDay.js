import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";

const CurrentDayContext = createContext();

export const useCurrentDayContext = () => useContext(CurrentDayContext);

const CurrentDayProvider = ({ children }) => {
  const [currentDay, setCurrentToday] = useState(dayjs());

  return (
    <CurrentDayContext.Provider value={{ currentDay, setCurrentToday }}>
      {children}
    </CurrentDayContext.Provider>
  );
};

export default CurrentDayProvider;
