import { Injectable } from '@angular/core';
import { Mission, MissionPulse, MissionType } from 'src/app/models/mission';
import { SocketService } from '../communication/socket.service';

@Injectable({
  providedIn: 'root',
})
export class MissionsService {
  activeMission: Mission;
  previousMissions: Mission[] = [
    {
      id: 'mission-1',
      timestamp: Date.now() / 1000 - 1,
      status: 'done',
      type: 'crazyradio',
      drones: {
        'real drone 1': 'skyblue',
        'real drone 2': 'yellow',
      },
      dronesPositions: {
        'real drone 1': { x: -1.25, y: -1.5 },
        'real drone 2': { x: 1.5, y: 1.25 },
      },
      dronesPaths: {
        'real drone 1': [
          { x: -1.25, y: -1.5 },
          { x: -1.25, y: 0.75 },
        ],
        'real drone 2': [
          { x: -1.0, y: 1.25 },
          { x: 1.5, y: 1.25 },
        ],
      },
      points: [
        { droneName: 'real drone 1', value: { x: -1, y: -1 } },
        { droneName: 'real drone 1', value: { x: -1, y: -0.75 } },
        { droneName: 'real drone 1', value: { x: -1, y: -0.5 } },
        { droneName: 'real drone 1', value: { x: -1, y: -0.25 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0.25 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0.5 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0.75 } },
        { droneName: 'real drone 2', value: { x: -1, y: 1 } },
        { droneName: 'real drone 2', value: { x: -0.75, y: 1 } },
        { droneName: 'real drone 2', value: { x: -0.5, y: 1 } },
        { droneName: 'real drone 2', value: { x: -0.25, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0.25, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0.5, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0.75, y: 1 } },
        { droneName: 'real drone 2', value: { x: 1, y: 1 } },
      ],
      shapes: [
        [
          { x: -1, y: -1 },
          { x: -1, y: 1 },
          { x: 1, y: 1 },
        ],
      ],
    },
    {
      id: 'mission-2',
      timestamp: Date.now() / 1000 - 1,
      status: 'done',
      type: 'crazyradio',
      drones: {
        'real drone 1': 'skyblue',
        'real drone 2': 'yellow',
      },
      dronesPositions: {
        'real drone 1': { x: 1.05, y: -1.25 },
        'real drone 2': { x: 1.25, y: -1.05 },
      },
      dronesPaths: {
        'real drone 1': [
          { x: -1.25, y: 1.2 },
          { x: -1.25, y: -1.25 },
          { x: 1.05, y: -1.25 },
        ],
        'real drone 2': [
          { x: -1.2, y: 1.25 },
          { x: 1.25, y: 1.25 },
          { x: 1.25, y: -1.05 },
        ],
      },
      points: [
        { droneName: 'real drone 1', value: { x: -1, y: 1 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0.75 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0.5 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0.25 } },
        { droneName: 'real drone 1', value: { x: -1, y: 0 } },
        { droneName: 'real drone 1', value: { x: -1, y: -0.25 } },
        { droneName: 'real drone 1', value: { x: -1, y: -0.5 } },
        { droneName: 'real drone 1', value: { x: -1, y: -0.75 } },
        { droneName: 'real drone 1', value: { x: -1, y: -1 } },
        { droneName: 'real drone 1', value: { x: -0.75, y: -1 } },
        { droneName: 'real drone 1', value: { x: -0.5, y: -1 } },
        { droneName: 'real drone 1', value: { x: -0.25, y: -1 } },
        { droneName: 'real drone 1', value: { x: 0, y: -1 } },
        { droneName: 'real drone 1', value: { x: 0.25, y: -1 } },
        { droneName: 'real drone 1', value: { x: 0.5, y: -1 } },
        { droneName: 'real drone 1', value: { x: 0.75, y: -1 } },
        { droneName: 'real drone 1', value: { x: 1, y: -1 } },
        { droneName: 'real drone 2', value: { x: -1, y: 1 } },
        { droneName: 'real drone 2', value: { x: -0.75, y: 1 } },
        { droneName: 'real drone 2', value: { x: -0.5, y: 1 } },
        { droneName: 'real drone 2', value: { x: -0.25, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0.25, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0.5, y: 1 } },
        { droneName: 'real drone 2', value: { x: 0.75, y: 1 } },
        { droneName: 'real drone 2', value: { x: 1, y: 1 } },
        { droneName: 'real drone 2', value: { x: 1, y: 0.75 } },
        { droneName: 'real drone 2', value: { x: 1, y: 0.5 } },
        { droneName: 'real drone 2', value: { x: 1, y: 0.25 } },
        { droneName: 'real drone 2', value: { x: 1, y: 0 } },
        { droneName: 'real drone 2', value: { x: 1, y: -0.25 } },
        { droneName: 'real drone 2', value: { x: 1, y: -0.5 } },
        { droneName: 'real drone 2', value: { x: 1, y: -0.75 } },
        { droneName: 'real drone 2', value: { x: 1, y: 1 } },
      ],
      shapes: [
        [
          { x: -1, y: -1 },
          { x: -1, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: -1 },
          { x: -1, y: -1 },
        ],
      ],
    },
  ];

  constructor(private readonly socketService: SocketService) {
    this.socketService.mission.subscribe((mission) => {
      this.onReceivedMission(mission);
    });

    this.socketService.missionPulse.subscribe((mission) => {
      this.onReceivedMissionPulse(mission);
    });
  }

  onReceivedMission(mission: Mission): void {
    if (mission.status === 'inProgress') {
      this.activeMission = mission;
      return ;
    }
    const indexOfRobot = this.previousMissions.findIndex((r) => r.id === mission.id);
    if (indexOfRobot === -1) {
      this.previousMissions.push(mission);
      return ;
    }
    Object.assign(this.previousMissions[indexOfRobot], mission);
  }

  onReceivedMissionPulse(mission: MissionPulse): void {
    let activeMission: Mission;
    if (!this.activeMission || mission.id !== this.activeMission.id) {
      activeMission = this.getNewRandomMission('fake');
    } else {
      activeMission = {...this.activeMission};
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'status')) {
      activeMission.status = mission.status;
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'dronesPositions')) {
      activeMission.dronesPositions = {...activeMission.dronesPositions, ...mission.dronesPositions};
      for (const droneName in mission.dronesPositions) {
        if (Object.prototype.hasOwnProperty.call(mission.dronesPositions, droneName)) {
          const pos = mission.dronesPositions[droneName];
          activeMission.dronesPaths[droneName] = [...activeMission.dronesPaths[droneName], pos];
        }
      }
      activeMission.dronesPaths = {...activeMission.dronesPaths};
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'shapes')) {
      activeMission.shapes = [...activeMission.shapes, ...mission.shapes];
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'points')) {
      activeMission.points = [...activeMission.points, ...mission.points];
    }
    this.activeMission = activeMission;
    console.log(this.activeMission);
  }

  startNewMission(missionType: MissionType): void {
    try {
      this.socketService.sendMessage({
        type: 'startMission',
        data: {
          type: missionType,
        },
      });
      return ;
    } catch (error) {
      console.log(error);
    }
    this.activeMission = this.getNewRandomMission(missionType);
    setTimeout(() => {
      if (this.activeMission.status === 'requested') {
        this.activeMission = {...this.activeMission, status: 'rejected'};
        setTimeout(() => {this.activeMission = undefined;}, 3000);
      }
    }, 3000);
  }

  private getNewRandomMission(missionType: MissionType): Mission {
    return {
      id: 'Unknown yet',
      timestamp: Date.now()/1000 - 1,
      status: 'requested',
      type: missionType,
      drones: {},
      dronesPositions: {},
      dronesPaths: {},
      shapes: [],
      points: [],
    };
  }
}
