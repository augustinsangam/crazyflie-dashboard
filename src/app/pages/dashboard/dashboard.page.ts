import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class DashboardPage {
  constructor(public readonly router: Router) {}
}
