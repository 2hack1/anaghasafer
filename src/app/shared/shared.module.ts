import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContainerComponent,
    HeaderComponent,FooterComponent
  ],
  exports: [
    CommonModule,
    ContainerComponent,
    HeaderComponent,FooterComponent
  ]
})
export class SharedModule { }
