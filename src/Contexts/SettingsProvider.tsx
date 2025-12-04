import React, { useEffect, useState } from "react";
import SettingsContext from "./SettingsContexts";
import { ClockSettings } from "../Interfaces/ClockSettings";
import { defaultSettings } from "./SettingsContexts";

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [clockSettings, setClockSettings] = useState<ClockSettings>(
    defaultSettings.clockSettings
  );
  useEffect(() => {
    const clockSettingItem = localStorage.getItem("clockSettings");
    const clockSettingsObj = clockSettingItem && JSON.parse(clockSettingItem);

    if (clockSettingsObj) {
      setClockSettings({
        theme: clockSettingsObj["clockTheme"],
        showNumbers: clockSettingsObj["showNumbers"],
      });
    } else {
      localStorage.setItem(
        "clockSettings",
        JSON.stringify({
          clockTheme: clockSettings.theme,
          showNumbers: clockSettings.showNumbers,
        })
      );
    }
  }, []);
  return (
    <SettingsContext
      value={{
        clockSettings,
        updateSettings: ({ theme, showNumbers }: ClockSettings) => {
          setClockSettings({ theme, showNumbers });
          localStorage.setItem(
            "clockSettings",
            JSON.stringify({
              clockTheme: theme,
              showNumbers: showNumbers,
            })
          );
        },
      }}
    >
      {children}
    </SettingsContext>
  );
}

export default SettingsProvider;
