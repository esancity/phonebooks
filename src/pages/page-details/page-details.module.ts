import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageDetailsPage } from './page-details';

@NgModule({
  declarations: [
    PageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PageDetailsPage),
  ],
})
export class PageDetailsPageModule {}
