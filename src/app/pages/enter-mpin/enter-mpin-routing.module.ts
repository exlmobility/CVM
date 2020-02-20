import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterMpinPage } from './enter-mpin.page';

const routes: Routes = [
  {
    path: '',
    component: EnterMpinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterMpinPageRoutingModule {}
