export interface Vec2 {
  x: number;
  y: number;
}

export type MissionType = 'crazyradio' | 'argos' | 'fake';
export type MissionStatus = 'requested' | 'rejected' | 'inProgress' | 'failed' | 'done';

export interface Mission {
  id: string;
  timestamp: number;
  type: MissionType;
  status: MissionStatus;
  drones: {
    [droneName: string]: string;
  };
  dronesPositions: {
    [droneName: string]: Vec2;
  };
  dronesPaths: {
    [droneName: string]: Vec2[];
  };
  shapes: Vec2[][];
  points: { droneName: string; value: Vec2 }[];
}

export interface MissionPulse {
  id: string;
  status?: MissionStatus;
  dronesPositions?: {
    [droneName: string]: Vec2;
  };
  shapes?: Vec2[][];
  points?: { droneName: string; value: Vec2 }[];
}
