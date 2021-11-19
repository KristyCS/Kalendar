import { createContext, useContext, useState } from "react";

const RsvpChangeContext = createContext();

export const useRsvpChangeContext = () => useContext(RsvpChangeContext);

const RsvpChangeProvider = ({ children }) => {
  const [rsvpChange, setRsvpChange] = useState(0);

  return (
    <RsvpChangeContext.Provider
      value={{
        rsvpChange,
        setRsvpChange,
      }}
    >
      {children}
    </RsvpChangeContext.Provider>
  );
};

export default RsvpChangeProvider;
