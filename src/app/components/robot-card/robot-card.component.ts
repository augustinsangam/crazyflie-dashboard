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
  @Output() lighten = new EventEmitter<null>();
  @Output() darken = new EventEmitter<null>();
  @Output() returnToBase = new EventEmitter<null>();
  humanizedDate = 'now';
  pi = Math.PI;

  ngOnInit(): void {
    setInterval(() => this.updateHumanizeDate(), 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.updateHumanizeDate();
    }
  }

  onLand(): void {
    this.land.emit(null);
  }

  onTakeOff(): void {
    this.takeOff.emit(null);
  }

  onReturnToBase(): void {
    this.returnToBase.emit(null);
  }

  onLedClick(): void {
    if (this.data.ledOn) {
      this.darken.emit(null);
    } else {
      this.lighten.emit(null);
    }
  }

  private updateHumanizeDate(): void {
    this.humanizedDate = relativeTime(new Date(this.data.timestamp * 1000));
  }
}
