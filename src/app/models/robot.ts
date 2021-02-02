export interface Robot {
  name: string;
  timestamp: number;
  speed: number;
  battery?: number;
  position?: [number, number, number];
  flying?: boolean;
}

export const DEFAULT_ROBOT: Robot = {
  name: `Fly # ${Math.ceil(Math.random() * 100)}`,
  timestamp: Date.now(),
  speed: 0,
  flying: false,
};
