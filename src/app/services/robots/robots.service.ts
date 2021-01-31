import { Injectable } from '@angular/core';
import { Robot } from 'src/app/models/robot';
import { SocketService } from '../communication/socket.service';

@Injectable({
  providedIn: 'root'
})
export class RobotsService {

  robots: Robot[] = [];

  constructor(private readonly socketService: SocketService) {
    this.socketService.robotsUpdates.subscribe((robot) => {
      this.onReceivedRobotUpdate(robot);
    });
  }

  onReceivedRobotUpdate(robot: Robot): void {
    const indexOfRobot = this.robots.findIndex((r) => r.name === robot.name);
    if (indexOfRobot === -1) {
      this.robots.push(robot);
    } else {
      this.robots[indexOfRobot] = robot;
    }
  }

  takeOffRobot(robotName: string): void {
    this.socketService.sendMessage({
      type: 'take_off',
      data: {
        robotName
      }
    });
  }

  landRobot(robotName: string): void {
    this.socketService.sendMessage({
      type: 'land',
      data: {
        robotName
      }
    });
  }

}
