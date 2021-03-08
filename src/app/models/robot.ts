export interface Robot {
  name: string;
  timestamp: number;
  speed: number;
  battery: number;
  position: [number, number, number];
  multiRange?: [number, number, number, number, number];
  flying: boolean;
  ledOn: boolean;
  real: boolean;
}

export const DEFAULT_ROBOT: Robot = {
  name: `Fly # ${Math.ceil(Math.random() * 100)}`,
  timestamp: Date.now() / 1000,
  speed: 0,
  battery: 50,
  position: [0, 0, 0],
  flying: false,
  ledOn: false,
  real: false
};
