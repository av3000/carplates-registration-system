import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarplatesComponent } from './components/carplates/carplates.component';
import { CarplateItemComponent } from './components/carplate-item/carplate-item.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FormCarplateComponent } from './components/form-carplate/form-carplate.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CarplatesComponent,
    CarplateItemComponent,
    HeaderComponent,
    FormCarplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
    // MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
