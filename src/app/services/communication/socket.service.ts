import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Mission, MissionPulse } from 'src/app/models/mission';
import { Robot } from 'src/app/models/robot';
import { ServerLog } from 'src/app/models/software-update';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  isConnected = false;
  socket: WebSocket;
  robotsPulses = new ReplaySubject<Robot>();
  robotsDisconnected = new ReplaySubject<string>();
  mission = new ReplaySubject<Mission>();
  missionPulse = new ReplaySubject<MissionPulse>();
  loadProjectLog = new ReplaySubject<ServerLog>();

  constructor() {
    // this.open();
  }

  sendMessage(message: { type: string; data: any }): void {
    const messageStr = JSON.stringify(message);
    console.log('Sending message', messageStr);
    if (!this.isConnected) {
      throw Error('Socket not connected to server');
    }
    this.socket.send(messageStr);
    console.log('Sent message', messageStr);
  }

  private open(): void {
    console.log('Attempting to connect');
    this.socket = new WebSocket(env.serverWebSocketAddress);
    this.socket.onopen = () => {
      console.log('Connected to the server');
      this.isConnected = true;
    };
    this.socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
      this.onReceiveMessage(JSON.parse(event.data));
    };
    this.socket.onclose = () => {
      this.isConnected = false;
      console.error('Disconnected from the server');
      setTimeout(() => {
        this.open();
      }, 1000);
    };
    this.socket.onerror = (error) => {
      console.log(error);
    };
  }

  private onReceiveMessage(message: { type: string; data: any }): void {
    switch (message.type) {
      case 'pulse':
        this.robotsPulses.next(message.data);
        break;
      case 'pulse':
        this.robotsDisconnected.next(message.data.name);
        break;
      case 'mission':
        this.mission.next(message.data);
        break;
      case 'missionPulse':
        this.missionPulse.next(message.data);
        break;
      case 'loadProjectLog':
        this.loadProjectLog.next(message.data);
        break;
      default:
        throw new Error(`Unrecognized command ${message.type}`);
    }
  }
}
