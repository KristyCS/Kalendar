import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";

const CurrentDateContext = createContext();

export const useCurrentDateContext = () => useContext(CurrentDateContext);

const CurrentDateProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [miniBoardMarker, setMiniBoardMarker]= useState(currentDate);
  return (
    <CurrentDateContext.Provider value={{ currentDate, setCurrentDate,miniBoardMarker, setMiniBoardMarker}}>
      {children}
    </CurrentDateContext.Provider>
  );
};

export default CurrentDateProvider;
