import { Component } from '@angular/core';
import { Options } from 'simplebar';
import { Robot } from 'src/app/models/robot';
import { RobotsService } from 'src/app/services/robots/robots.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'missions-page',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MissionsPage {
  options: Options = {
    autoHide: false,
    scrollbarMinSize: 100,
  };

  constructor(public readonly robotService: RobotsService) {}

  onLandRobot(robot: Robot): void {
    this.robotService.landRobot(robot.name);
  }

  onTakeOffRobot(robot: Robot): void {
    this.robotService.takeOffRobot(robot.name);
  }
}
