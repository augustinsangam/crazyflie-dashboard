import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChipComponent } from '../components/chip/chip.component';
import { ConnectionComponent } from '../components/connection/connection.component';
import { DronesComponent } from '../components/drones/drones.component';
import { RobotCardComponent } from '../components/robot-card/robot-card.component';
import { AboutPage } from '../pages/about/about.component';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { MissionsPage } from '../pages/missions/missions.component';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';

const pages = [AboutPage, DashboardPage, MissionsPage];
const components = [
  ChipComponent,
  ConnectionComponent,
  DronesComponent,
  RobotCardComponent,
];

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    RoutingModule,
    SimplebarAngularModule,
  ],
  providers: [],
  bootstrap: [DashboardPage],
})
export class DashboardModule {}
