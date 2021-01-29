import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { relativeTime } from 'human-date';
import { DEFAULT_ROBOT, Robot } from 'src/app/models/robot';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'robot-card-component',
  templateUrl: './robot-card.component.html',
  styleUrls: ['./robot-card.component.scss'],
})
export class RobotCardComponent implements OnChanges, OnInit {

  @Input() data: Robot = DEFAULT_ROBOT;
  humanizedDate = 'now';

  ngOnInit(): void {
    setInterval(() => this.updateHumanizeDate(), 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.updateHumanizeDate();
    }
  }

  private updateHumanizeDate(): void {
    this.humanizedDate = relativeTime(this.data.lastUpdate);
  }
}
