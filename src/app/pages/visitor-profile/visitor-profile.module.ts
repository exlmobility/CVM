import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorProfilePageRoutingModule } from './visitor-profile-routing.module';

import { VisitorProfilePage } from './visitor-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorProfilePageRoutingModule
  ],
  declarations: [VisitorProfilePage]
})
export class VisitorProfilePageModule {}
