import { useGripStore } from "../../store/grip-slice";
import { useEffect } from "react";

const useSetSettings = (settings) => {
  const { settings: storeSettings, setSettings } = useGripStore();

  useEffect(() => {
    if (storeSettings === undefined && settings !== null) {
      setSettings(settings);
    }
  }, [storeSettings, settings, setSettings]);
};

export default useSetSettings;
