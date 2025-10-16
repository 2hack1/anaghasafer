import { ErrorHandler, Injectable,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { FooterComponent } from './components/footer/footer.component';
Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global Error:', error);
    // You can send it to server here
  }
}
@NgModule({
   providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
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
