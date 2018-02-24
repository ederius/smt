//Angular packages - paquetes de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

//AngularFire package - paquete angularfire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";

//Packages
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




//Environment variables - variables de entorno
import { environment } from '../environments/environment';

// services - servicios
import { GuardiaService } from "./services/guardia.service";
import { AutenticacionService } from "./services/autenticacion.service";
import { PinesService } from "./services/pines.service";
import { StoreFileService } from "./services/store-file.service";
import { PinComponent } from './components/pin/pin.component';
import { GuardiaPinService } from "./services/guardia-pin.service";
import { InscripcionesService } from "./services/inscripciones.service";
import { UtilsService } from "./services/utils.service";
import { EmailsService } from "./services/emails.service";

//rutas - routes // componentes (ROUTES_APP)
import { routedComponents, ROUTES_APP } from "./routes";

//Components - componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PinHeaderComponent } from './components/shared/pin-header/pin-header.component';
import { ReversePipe } from './pipes/reverse.pipe';

//Pipes 
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { SearchPipe } from './pipes/search.pipe';
import { OrdenarPipe } from './pipes/ordenar.pipe';




@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    NavbarComponent,
    HeaderComponent,
    PinComponent,
    PinHeaderComponent,
    ReversePipe,
    SearchPipe,
    OrdenarPipe

  ],
  imports: [
    BrowserModule,
    HttpModule,
    ROUTES_APP,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'smt-1'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    Ng2FilterPipeModule,
    NgbModule.forRoot()

    
  ],
  providers: [
    AutenticacionService,
    GuardiaService,
    PinesService,
    StoreFileService,
    GuardiaPinService,
    InscripcionesService,
    UtilsService,
    EmailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
