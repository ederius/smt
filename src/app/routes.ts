import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';

//Panel de administracion
import { LoginComponent } from "./components/login/login.component";
import { PanelComponent } from './components/panel/panel.component';
import { InicioComponent } from "./components/inicio/inicio.component";
import { PinesComponent } from './components/pines/pines.component';
import { InscritosComponent } from './components/inscritos/inscritos.component';
import { AdmitidosComponent } from './components/admitidos/admitidos.component';
import { MatriculadosComponent } from './components/matriculados/matriculados.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';
import { RegisterUserComponent } from "./components/register-user/register-user.component";

//panel de padres de familia o niños
import { PinComponent } from "./components/pin/pin.component";
import { PinLoginComponent } from './components/pin-login/pin-login.component';
import { PinInscripcionesComponent } from './components/pin-inscripciones/pin-inscripciones.component';
import { PinEntrevistasComponent } from './components/pin-entrevistas/pin-entrevistas.component';
import { PinAdmitidosComponent } from './components/pin-admitidos/pin-admitidos.component';
import { PinMatriculadosComponent } from './components/pin-matriculados/pin-matriculados.component';

//servicios
import { GuardiaService } from "./services/guardia.service";
import { GuardiaPinService } from "./services/guardia-pin.service";

const ROUTES: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegisterUserComponent },    
  { path: 'panel', component: PanelComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio'},
      { path: 'inicio', component:InicioComponent },
      { path: 'pines', component:PinesComponent },
      { path: 'inscritos', component:InscritosComponent },
      { path: 'admitidos', component:AdmitidosComponent },
      { path: 'matriculados', component:MatriculadosComponent },
      { path: 'transacciones', component:TransaccionesComponent },
      { path: 'administradores', component:AdministradoresComponent }
    ],
    canActivate: [ GuardiaService ]
  },
  
  { path: 'pin', component: PinComponent,
    children:[
      { path: 'inscripciones', component:PinInscripcionesComponent },
      { path: 'entrevistas', component:PinInscripcionesComponent },
      { path: 'admitidos', component:PinInscripcionesComponent },
      { path: 'matriculados', component:PinInscripcionesComponent }      
    ],
    canActivate: [GuardiaPinService]
  },
  { path: 'pin/login', component:PinLoginComponent },  
  { path: '**', pathMatch: 'full', redirectTo:'pin/login' }
];

export const ROUTES_APP = RouterModule.forRoot(ROUTES, {useHash:true});

export const routedComponents = [
  //Components dashboard - componentes del panel
  LoginComponent,
  RegisterUserComponent,
  PanelComponent, 
  InicioComponent, 
  PinesComponent, 
  InscritosComponent,
  AdmitidosComponent,
  MatriculadosComponent,
  TransaccionesComponent,
  AdministradoresComponent,
  //pin components - componentes de pines 
  PinComponent,
  PinLoginComponent,
  PinInscripcionesComponent,
  PinAdmitidosComponent,
  PinEntrevistasComponent,
  PinMatriculadosComponent
];