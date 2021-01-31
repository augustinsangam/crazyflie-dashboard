interface Localization {
  x: number;
  y: number;
  z: number;
}

export interface Robot {
  name: string;
  speed: number;
  batteryPercentage?: number;
  localization?: Localization;
  lastUpdate: number;
  isOn: boolean;
}

export const DEFAULT_ROBOT: Robot = {
  name: `Fly # ${Math.ceil(Math.random() * 100)}`,
  speed: 0,
  lastUpdate: Date.now(),
  isOn: false,
};
