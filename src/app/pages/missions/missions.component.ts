import { Component } from '@angular/core';
import { Options } from 'simplebar';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'missions-page',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MissionsPage {

  options: Options = {
    autoHide: false,
    scrollbarMinSize: 100
  };

}
