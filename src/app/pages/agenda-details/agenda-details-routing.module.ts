import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaDetailsPage } from './agenda-details.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaDetailsPageRoutingModule {}
