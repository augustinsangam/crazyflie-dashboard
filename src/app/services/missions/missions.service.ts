import { Injectable } from '@angular/core';
import { Mission, MissionPulse, MissionType } from 'src/app/models/mission';
import { SocketService } from '../communication/socket.service';

@Injectable({
  providedIn: 'root',
})
export class MissionsService {
  activeMission: Mission;
  previousMissions: Mission[] = [];
  timer: NodeJS.Timer | undefined;

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
      this.resetTimer();
      return;
    }
    const indexOfRobot = this.previousMissions.findIndex(
      (r) => r.id === mission.id
    );
    if (indexOfRobot === -1) {
      this.previousMissions = [...this.previousMissions, mission];
      return;
    }
    Object.assign(this.previousMissions[indexOfRobot], mission);
    this.previousMissions = [...this.previousMissions];
  }

  onReceivedMissionPulse(mission: MissionPulse): void {
    this.resetTimer();
    let activeMission: Mission;
    if (!this.activeMission || mission.id !== this.activeMission.id) {
      activeMission = this.getNewRandomMission('fake');
    } else {
      activeMission = { ...this.activeMission };
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'status')) {
      activeMission.status = mission.status;
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'dronesPositions')) {
      activeMission.dronesPositions = {
        ...activeMission.dronesPositions,
        ...mission.dronesPositions,
      };
      for (const droneName in mission.dronesPositions) {
        if (
          Object.prototype.hasOwnProperty.call(
            mission.dronesPositions,
            droneName
          )
        ) {
          const pos = mission.dronesPositions[droneName];
          activeMission.dronesPaths[droneName] = [
            ...activeMission.dronesPaths[droneName],
            pos,
          ];
        }
      }
      activeMission.dronesPaths = { ...activeMission.dronesPaths };
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'shapes')) {
      activeMission.shapes = [...activeMission.shapes, ...mission.shapes];
    }
    if (Object.prototype.hasOwnProperty.call(mission, 'points')) {
      activeMission.points = [...activeMission.points, ...mission.points];
    }

    if (activeMission.status === 'done') {
      this.previousMissions = [activeMission, ...this.previousMissions];
      this.activeMission = undefined;
    } else {
      this.activeMission = activeMission;
    }
  }

  startNewMission(missionType: MissionType): void {
    try {
      this.socketService.sendMessage({
        type: 'startMission',
        data: {
          type: missionType,
        },
      });
      return;
    } catch (error) {
      console.error(error);
    }
    this.activeMission = this.getNewRandomMission(missionType);
    setTimeout(() => {
      if (this.activeMission && this.activeMission.status === 'requested') {
        this.activeMission = { ...this.activeMission, status: 'rejected' };
        setTimeout(() => {
          this.activeMission = undefined;
        }, 3000);
      }
    }, 3000);
  }

  private resetTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    this.timer = setInterval(() => {
      if (this.activeMission) {
        this.activeMission = { ...this.activeMission, status: 'failed'};
        this.previousMissions = [...this.previousMissions, this.activeMission];
        this.activeMission = undefined;
      } else {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    }, 5000);
  }

  private getNewRandomMission(missionType: MissionType): Mission {
    return {
      id: 'Unknown yet',
      timestamp: Date.now() / 1000 - 1,
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
