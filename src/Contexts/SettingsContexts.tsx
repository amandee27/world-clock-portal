import { createContext } from "react";
import { clockPhases } from "../data/clockPhases";
import { Settings } from "../Interfaces/ClockSettings";

const defaultSettings: Settings = {
  clockSettings: {
    theme: clockPhases[0],
    showNumbers: false,
  },
  updateSettings: null,
};

const SettingsContext = createContext<Settings>(defaultSettings);

export default SettingsContext;

export { defaultSettings };
