import { ClockPhase } from "./ClockPhase";

export interface Settings {
  clockSettings: ClockSettings;
  updateSettings?: ((clockSettings: ClockSettings) => void) | null;
}

export interface ClockSettings {
  theme: ClockPhase;
  showNumbers: boolean;
}
