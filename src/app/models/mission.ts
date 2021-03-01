export interface Vec2 {
  x: number;
  y: number;
}

export type MissionType = 'crazyradio' | 'argos' | 'fake';
export type MissionStatus = 'requested' | 'in_progress' | 'failed' | 'done';
export interface Mission {
  id: string;
  timestamp: number;
  type: MissionType;
  status: MissionStatus;
  drones: {
    name: string;
    color: string;
  }[];
  shapes: Vec2[][];
  points: { droneName: string; value: Vec2 }[];
}
