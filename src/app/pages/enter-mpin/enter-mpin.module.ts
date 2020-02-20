import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterMpinPageRoutingModule } from './enter-mpin-routing.module';

import { EnterMpinPage } from './enter-mpin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterMpinPageRoutingModule
  ],
  declarations: [EnterMpinPage]
})
export class EnterMpinPageModule {}
