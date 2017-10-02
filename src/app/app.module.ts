import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routedComponents, ROUTES_APP } from "./routes";
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeaderComponent } from './components/shared/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    NavbarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ROUTES_APP
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
