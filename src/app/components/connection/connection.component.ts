import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/communication/socket.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'connection-component',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent implements OnInit {
  constructor(public readonly socketService: SocketService) {}

  ngOnInit(): void {}
}
