import { Component, Input, OnInit } from '@angular/core';
import { Mission } from 'src/app/models/mission';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'missions-history',
  templateUrl: './missions-history.component.html',
  styleUrls: ['./missions-history.component.scss']
})
export class MissionsHistoryComponent implements OnInit {

  @Input() missions: Mission[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
