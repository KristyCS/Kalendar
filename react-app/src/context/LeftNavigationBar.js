import { createContext, useContext, useState } from "react";

const LeftNavigationBarContext = createContext();

export const useLeftNavigationBarContext = () => useContext(LeftNavigationBarContext);

const LeftNavigationBarProvider = ({ children }) => {
  const [showLeftNavigationBar, setShowLeftNavigationBar] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(['family','work','other']);

  return (
    <LeftNavigationBarContext.Provider value={{ selectedLabels, setSelectedLabels,showLeftNavigationBar, setShowLeftNavigationBar }}>
      { children }
    </LeftNavigationBarContext.Provider>
  );
};

export default LeftNavigationBarProvider;