import { createContext, useContext, useState } from "react";

const LeftNavigationBarContext = createContext();

export const useLeftNavigationBarContext = () => useContext(LeftNavigationBarContext);

const LeftNavigationBarProvider = ({ children }) => {
  const [showLeftNavigationBar, setShowLeftNavigationBar] = useState();

  return (
    <LeftNavigationBarContext.Provider value={{ showLeftNavigationBar, setShowLeftNavigationBar }}>
      { children }
    </LeftNavigationBarContext.Provider>
  );
};

export default LeftNavigationBarProvider;