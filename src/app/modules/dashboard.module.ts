import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RobotCardComponent } from '../components/robot-card/robot-card.component';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';

const pages = [DashboardPage];
const components = [RobotCardComponent];

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [DashboardPage],
})
export class DashboardModule {}
