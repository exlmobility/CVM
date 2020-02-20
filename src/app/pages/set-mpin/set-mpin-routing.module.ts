import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetMpinPage } from './set-mpin.page';

const routes: Routes = [
  {
    path: '',
    component: SetMpinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetMpinPageRoutingModule {}
