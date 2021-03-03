import { Component } from '@angular/core';
import { Options } from 'simplebar';
import { MissionType } from 'src/app/models/mission';
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

  onStartMission(): void {
    this.missionsService.startNewMission(this.missionType);
  }
}
