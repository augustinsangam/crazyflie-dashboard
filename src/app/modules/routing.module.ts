import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPage } from '../pages/about/about.component';
import { CodePage } from '../pages/code/code.page';
import { MissionsPage } from '../pages/missions/missions.page';

const routes: Routes = [
  { path: 'about', component: AboutPage },
  { path: 'code', component: CodePage },
  { path: 'home', component: MissionsPage },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: MissionsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class RoutingModule {}
