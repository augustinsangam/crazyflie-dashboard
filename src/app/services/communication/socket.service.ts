import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Robot } from 'src/app/models/robot';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  isConnected = false;
  socket: WebSocket;
  robotsUpdates = new ReplaySubject<Robot>();

  constructor() {
    this.open();
  }

  sendMessage(message: { type: string; data: any }): void {
    const messageStr = JSON.stringify(message);
    this.socket.send(messageStr);
    console.log('Send message', messageStr);
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
        this.robotsUpdates.next(message.data);
        break;
      default:
        throw new Error(`Unrecognized command ${message.type}`);
    }
  }
}
