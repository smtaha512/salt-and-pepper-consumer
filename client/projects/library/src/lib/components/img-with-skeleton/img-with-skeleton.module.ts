import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ImgWithSkeletonComponent } from './img-with-skeleton.component';

@NgModule({
  declarations: [ImgWithSkeletonComponent],
  exports: [ImgWithSkeletonComponent],
  imports: [CommonModule, IonicModule],
})
export class ImgWithSkeletonModule {}
