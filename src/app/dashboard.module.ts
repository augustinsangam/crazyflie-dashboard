import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChipComponent } from './components/chip/chip.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { IconComponent } from './components/icon/icon.component';
import { RobotCardComponent } from './components/robot-card/robot-card.component';
import { RoutingModule } from './modules/routing.module';
import { AboutPage } from './pages/about/about.component';
import { CodePage } from './pages/code/code.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { MissionsPage } from './pages/missions/missions.component';
import { EditorComponent } from './components/editor/editor.component';



const pages = [AboutPage, DashboardPage, MissionsPage, CodePage];
const components = [ChipComponent, ConnectionComponent, IconComponent, RobotCardComponent];

@NgModule({
  declarations: [...pages, ...components, EditorComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CodemirrorModule,
    FormsModule,
    HttpClientModule,
    MonacoEditorModule,
    RoutingModule,
    SimplebarAngularModule,
  ],
  providers: [{
    provide: MONACO_PATH,
    useValue: 'https://unpkg.com/monaco-editor@0.19.3/min/vs'
  }],
  bootstrap: [DashboardPage],
})
export class DashboardModule {}
