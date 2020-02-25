import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorProfilePage } from './visitor-profile.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorProfilePageRoutingModule {}
