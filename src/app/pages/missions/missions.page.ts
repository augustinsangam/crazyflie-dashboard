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

  missionType: MissionType = 'fake';
  missionsTypeOptions = [
    { value: 'argos', label: 'ARGoS based mission' },
    { value: 'crazyradio', label: 'Crazyradio based mission' },
    { value: 'fake', label: 'Fake mission' },
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
    this.missionsService.startNewMission(this.missionType, this.robots);
  }

  onReturnToBase(): void {
    this.robotService.returnToBaseRobot('*');
  }

  onCancelMission(): void {
    this.robotService.cancelMission(this.missionsService.activeMission.id);
  }

  onSelect(newValue: MissionType): void {
    if (newValue === 'crazyradio') {
      this.robots = this.robotService.robots.filter(r => r.real).map((r, index) => ({
          name: r.name,
          pos: {
            x : -0.25 + 0.25 * index,
            y : 0
          }
        }));
    }
    this.missionType = newValue;
  }
}
