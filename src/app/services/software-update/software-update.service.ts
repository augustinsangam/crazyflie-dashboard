import { Injectable } from '@angular/core';
import {
  ClientLog,
  ProjectType,
  ServerLog,
} from 'src/app/models/software-update';
import { SocketService } from '../communication/socket.service';

@Injectable({
  providedIn: 'root',
})
export class SoftwareUpdateService {
  logs: ClientLog[] = [];

  constructor(private readonly socketService: SocketService) {
    this.socketService.loadProjectLog.subscribe((data: ServerLog) =>
      this.onReceiveLog(data)
    );
  }

  sendProject(type: ProjectType, code?: string): void {
    const data: { type: ProjectType; code?: string } = { type };
    if (type === 'sandbox') {
      data.code = code;
    }
    this.socketService.sendMessage({
      type: 'loadProject',
      data,
    });
  }

  private onReceiveLog(data: ServerLog): void {
    this.logs = [
      {
        date: new Date(data.timestamp * 1000).toISOString(),
        message: data.log,
        type: data.type,
      },
      ...this.logs,
    ];
  }
}
