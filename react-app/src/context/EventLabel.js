import { createContext, useContext, useState } from "react";

const EventLabelContext = createContext();

export const useEventLabelContext = () => useContext(EventLabelContext);

const EventLabelProvider = ({ children }) => {
  const [checkFamily, setCheckFamily] = useState(true);
  const [checkWork, setCheckWork] = useState(true);
  const [checkOther, setCheckOther] = useState(true);
  return (
    <EventLabelContext.Provider
      value={{
        checkFamily,
        setCheckFamily,
        checkWork,
        setCheckWork,
        checkOther,
        setCheckOther,
      }}
    >
      {children}
    </EventLabelContext.Provider>
  );
};

export default EventLabelProvider;
