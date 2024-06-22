import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

const DefaultConfigs: Configs = {
  displayTime: 10,
};

type Configs = {
  displayTime: number;
};

type ConfigsContext = {
  data: Configs;
  setData: (data: Configs) => void;
};

const AppContext = createContext<ConfigsContext>({
  data: DefaultConfigs,
  setData: (_: Configs) => {},
});

export const ConfigsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Configs>(DefaultConfigs);

  useEffect(() => {
    (async () => {
      const storedData = await AsyncStorage.getItem("configs");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    })();
  }, []);

  function updateData(newData: Configs) {
    AsyncStorage.setItem("configs", JSON.stringify(newData));

    setData((prevData) => ({ ...prevData, ...newData }));
  }

  return (
    <AppContext.Provider value={{ data, setData: updateData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useConfigs = (): ConfigsContext => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
