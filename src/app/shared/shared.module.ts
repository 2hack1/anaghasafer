import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    ContainerComponent,
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    ContainerComponent,

  ]
})
export class SharedModule { }
