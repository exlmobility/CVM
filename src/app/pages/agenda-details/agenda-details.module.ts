import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaDetailsPageRoutingModule } from './agenda-details-routing.module';

import { AgendaDetailsPage } from './agenda-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaDetailsPageRoutingModule
  ],
  declarations: [AgendaDetailsPage]
})
export class AgendaDetailsPageModule {}
