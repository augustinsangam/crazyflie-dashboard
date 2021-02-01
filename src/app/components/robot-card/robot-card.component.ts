import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
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
  @Output() land = new EventEmitter<null>();
  @Output() takeOff = new EventEmitter<null>();
  humanizedDate = 'now';

  ngOnInit(): void {
    setInterval(() => this.updateHumanizeDate(), 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.updateHumanizeDate();
    }
  }

  onClick(): void {
    if (this.data.flying) {
      this.land.emit(null);
    } else {
      this.takeOff.emit(null);
    }
  }

  private updateHumanizeDate(): void {
    this.humanizedDate = relativeTime(new Date(this.data.timestamp * 1000));
  }
}
