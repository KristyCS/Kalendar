import { createContext, useContext, useState } from "react";

const TodayContext = createContext();

export const useTodayContext = () => useContext(TodayContext);

const TodayProvider = ({ children }) => {
  const [today, setToday] = useState();

  return (
    <TodayContext.Provider value={{ today, setToday }}>
      { children }
    </TodayContext.Provider>
  );
};

export default TodayProvider;