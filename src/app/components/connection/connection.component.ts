import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/communication/socket.service';

/**
 * ConnectionComponent display the connection status with the server
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'connection-component',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent {
  constructor(public readonly socketService: SocketService) {}
}
