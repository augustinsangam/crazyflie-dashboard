import { Component } from '@angular/core';
import { Options } from 'simplebar';
import { Mission, MissionType } from 'src/app/models/mission';
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

  activeMission: Mission;
  previousMissions: Mission[] = [
    {
      id: 'mission-1',
      timestamp: 0,
      status: 'done',
      type: 'crazyradio',
      drones: [
        {color: 'skyblue', name: 'real drone 1'},
        {color: 'purple', name: 'real drone 2'}
      ],
      points: [
        {droneName: 'real drone 1', value: {x: -1, y: 0}},
        {droneName: 'real drone 2', value: {x: -1, y: 1}},
        {droneName: 'real drone 2', value: {x: 0, y: 1}},
      ],
      shapes: [
        [{x: -1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}]
      ]
    },
    {
      id: 'mission-2',
      timestamp: 0,
      status: 'done',
      type: 'crazyradio',
      drones: [
        {color: 'skyblue', name: 'real drone 1'},
        {color: 'purple', name: 'real drone 2'}
      ],
      points: [
        {droneName: 'real drone 1', value: {x: -1, y: 0}},
        {droneName: 'real drone 2', value: {x: -1, y: 1}},
        {droneName: 'real drone 2', value: {x: 0, y: 1}},
      ],
      shapes: [
        [{x: -1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}]
      ]
    }
  ];

  missionType: MissionType = 'fake';
  missionsTypeOptions = [
    { value: 'argos', label: 'ARGoS based mission' },
    { value: 'crazyradio', label: 'Crazyradio based mission' },
    { value: 'fake', label: 'Fake mission' },
  ];

  constructor(public readonly robotService: RobotsService) {}

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
    this.robotService.startNewMission(this.missionType);
  }
}
