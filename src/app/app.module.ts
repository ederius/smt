import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { routedComponents, ROUTES_APP } from "./routes";
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeaderComponent } from './components/shared/header/header.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from '../environments/environment';
import { RegisterUserComponent } from './components/register-user/register-user.component';

// services
import { GuardiaService } from "./services/guardia.service";
import { AutenticacionService } from "./services/autenticacion.service";
import { PinesService } from "./services/pines.service";


@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    NavbarComponent,
    HeaderComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    ROUTES_APP,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'smt-1'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule

    
  ],
  providers: [
    AutenticacionService,
    GuardiaService,
    PinesService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
