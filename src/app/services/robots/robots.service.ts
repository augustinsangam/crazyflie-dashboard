import { Injectable } from '@angular/core';
import { DEFAULT_ROBOT, Robot, RobotPulse } from 'src/app/models/robot';
import { SocketService } from '../communication/socket.service';

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  robots: Robot[] = [];
  // robots: Robot[] = [
  //   { ...DEFAULT_ROBOT, state: 'onTheGround', name: 'Drone #1', real: true },
  //   { ...DEFAULT_ROBOT, state: 'takingOff', name: 'Drone #2', yaw: 3.13 },
  //   {
  //     ...DEFAULT_ROBOT,
  //     state: 'landing',
  //     name: 'Drone #3',
  //     yaw: 6,
  //     real: true,
  //     ledOn: true,
  //   },
  //   { ...DEFAULT_ROBOT, state: 'crashed', name: 'Drone #4' },
  //   { ...DEFAULT_ROBOT, state: 'exploring', name: 'Drone #5', real: true },
  //   { ...DEFAULT_ROBOT, state: 'returningToBase', name: 'Drone #5' },
  // ];

  constructor(private readonly socketService: SocketService) {
    this.socketService.robotsPulses.subscribe((robot) => {
      this.onReceivedRobotUpdate(robot);
    });

    this.socketService.robotsDisconnected.subscribe((robotName) => {
      this.onReceivedRobotDisconnection(robotName);
    });
  }

  onReceivedRobotUpdate(robot: Robot | RobotPulse): void {
    const indexOfRobot = this.robots.findIndex((r) => r.name === robot.name);
    if (indexOfRobot === -1) {
      this.robots.push(robot as Robot);
    } else {
      Object.assign(this.robots[indexOfRobot], robot);
    }
  }

  onReceivedRobotDisconnection(robotName: string): void {
    this.robots = this.robots.filter((r) => r.name !== robotName);
  }

  takeOffRobot(robotName: string): void {
    this.socketService.sendMessage({
      type: 'takeOff',
      data: {
        name: robotName,
      },
    });
  }

  landRobot(robotName: string): void {
    this.socketService.sendMessage({
      type: 'land',
      data: {
        name: robotName,
      },
    });
  }

  lightenRobot(robotName: string): void {
    this.socketService.sendMessage({
      type: 'lighten',
      data: {
        name: robotName,
      },
    });
  }

  darkenRobot(robotName: string): void {
    this.socketService.sendMessage({
      type: 'darken',
      data: {
        name: robotName,
      },
    });
  }

  returnToBaseRobot(robotName: string): void {
    this.socketService.sendMessage({
      type: 'returnToBase',
      data: {
        name: robotName,
      },
    });
  }

  cancelMission(missionId: string): void {
    this.socketService.sendMessage({
      type: 'stopMission',
      data: {
        id: missionId,
      },
    });
  }
}
