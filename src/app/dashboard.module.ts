import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChipComponent } from './components/chip/chip.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { EditorComponent } from './components/editor/editor.component';
import { IconComponent } from './components/icon/icon.component';
import { MissionsHistoryComponent } from './components/missions-history/missions-history.component';
import { RobotCardComponent } from './components/robot-card/robot-card.component';
import { RoutingModule } from './modules/routing.module';
import { AboutPage } from './pages/about/about.component';
import { CodePage } from './pages/code/code.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { MissionsPage } from './pages/missions/missions.component';

const pages = [AboutPage, DashboardPage, MissionsPage, CodePage];
const components = [
  ChipComponent,
  ConnectionComponent,
  EditorComponent,
  IconComponent,
  MissionsHistoryComponent,
  RobotCardComponent,
];

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CodemirrorModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    SimplebarAngularModule,
  ],
  providers: [],
  bootstrap: [DashboardPage],
})
export class DashboardModule {}
