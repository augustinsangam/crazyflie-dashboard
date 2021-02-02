import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPage } from '../pages/about/about.component';
import { MissionsPage } from '../pages/missions/missions.component';

const routes: Routes = [
  { path: 'about', component: AboutPage },
  { path: 'home', component: MissionsPage },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: MissionsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class RoutingModule {}
