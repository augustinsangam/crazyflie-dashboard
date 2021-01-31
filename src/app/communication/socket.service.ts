import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  isConnected = false;
  socket: WebSocket;
  private readonly url = `ws://${env.serverAddress}:${env.serverPort}`;

  constructor() {
    this.open();
  }

  open(): void {
    console.log('Attempting to connect');
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('Connected to the server');
    };
    this.socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
    };
    this.socket.onclose = () => {
      this.isConnected = false;
      console.log('Disconnected from the server');
      setTimeout(() => {
        this.open();
      }, 1000);
    };
    this.socket.onerror = () => {
      this.isConnected = false;
    };
  }

}
