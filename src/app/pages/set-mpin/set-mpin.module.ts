import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetMpinPageRoutingModule } from './set-mpin-routing.module';

import { SetMpinPage } from './set-mpin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetMpinPageRoutingModule
  ],
  declarations: [SetMpinPage]
})
export class SetMpinPageModule {}
