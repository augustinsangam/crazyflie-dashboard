import { Injectable } from '@angular/core';
import { Robot } from 'src/app/models/robot';
import { SocketService } from '../communication/socket.service';

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  robots: Robot[] = [];

  constructor(private readonly socketService: SocketService) {
    this.socketService.robotsPulses.subscribe((robot) => {
      this.onReceivedRobotUpdate(robot);
    });

    this.socketService.robotsDisconnected.subscribe((robotName) => {
      this.onReceivedRobotDisconnection(robotName);
    });
  }

  onReceivedRobotUpdate(robot: Robot): void {
    const indexOfRobot = this.robots.findIndex((r) => r.name === robot.name);
    if (indexOfRobot === -1) {
      this.robots.push(robot);
    } else {
      Object.assign(this.robots[indexOfRobot], robot);
    }
  }

  onReceivedRobotDisconnection(robotName: string): void {
    this.robots = this.robots.filter(r => r.name !== robotName);
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

}
