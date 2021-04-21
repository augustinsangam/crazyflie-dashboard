import { Component } from '@angular/core';
import { Options } from 'simplebar';
import { MissionPageRobot, MissionType } from 'src/app/models/mission';
import { Robot } from 'src/app/models/robot';
import { MissionsService } from 'src/app/services/missions/missions.service';
import { RobotsService } from 'src/app/services/robots/robots.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'missions-page',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MissionsPage {
  options: Options = {
    autoHide: false,
    scrollbarMinSize: 100,
  };

  robots: MissionPageRobot[] = [];

  missionType: MissionType | '-' = '-';
  missionsTypeOptions = [
    { value: '-', label: '-' },
    { value: 'argos', label: 'ARGoS based mission' },
    { value: 'crazyradio', label: 'Crazyradio based mission' },
  ];

  constructor(
    public readonly robotService: RobotsService,
    public readonly missionsService: MissionsService
  ) {}

  onLandRobot(robot: Robot): void {
    this.robotService.landRobot(robot.name);
  }

  onTakeOffRobot(robot: Robot): void {
    this.robotService.takeOffRobot(robot.name);
  }

  onLightenRobot(robot: Robot): void {
    this.robotService.lightenRobot(robot.name);
  }

  onDarkenRobot(robot: Robot): void {
    this.robotService.darkenRobot(robot.name);
  }

  onReturnToBaseRobot(robot: Robot): void {
    this.robotService.returnToBaseRobot(robot.name);
  }

  onStartMission(): void {
    if (this.missionType === '-') {
      window.alert('You should specify either argos or crazyradio mission');
      return;
    }
    let robotsToSend: MissionPageRobot[] = [];
    if (this.missionType === 'argos') {
      robotsToSend = this.robots.map((r) => ({
        name: r.name,
        pos: { x: r.pos.y, y: r.pos.x },
      }));
    } else if (this.missionType === 'crazyradio') {
      robotsToSend = this.robots.map((r) => ({
        name: r.name,
        pos: { x: r.pos.x, y: -r.pos.y },
      }));
    }
    this.missionsService.startNewMission(this.missionType, robotsToSend);
  }

  onReturnToBase(): void {
    this.robotService.returnToBaseRobot('*');
  }

  onCancelMission(): void {
    this.robotService.cancelMission(this.missionsService.activeMission.id);
  }

  onSelect(newValue: MissionType): void {
    if (newValue === 'crazyradio') {
      this.robots = this.robotService.robots
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((r) => r.real)
        .map((r) => ({
          name: r.name,
          pos: { x: 0, y: 0 },
        }));
    }
    if (newValue === 'argos') {
      const placeholders = [
        { x: -0.2, y: 0 },
        { x: 0.2, y: 0 },
        { x: 0, y: 0.2 },
        { x: 0, y: -0.2 },
      ];
      this.robots = this.robotService.robots
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((r) => !r.real)
        .map((r, index) => ({
          name: r.name,
          pos:
            index < placeholders.length ? placeholders[index] : { x: 0, y: 0 },
        }));
    }
    this.missionType = newValue;
  }
}
