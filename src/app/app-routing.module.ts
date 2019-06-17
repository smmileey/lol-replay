import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReplayComponent } from './replay/replay.component';

const routes: Routes = [
  {path: "replay", component: ReplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
