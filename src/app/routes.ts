import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';

//Panel de administracion
import { PanelLoginComponent }          from "./components/panel-login/panel-login.component";
import { PanelComponent }               from './components/panel/panel.component';
import { PanelInicioComponent }         from "./components/panel-inicio/panel-inicio.component";
import { PanelPinesGenerarComponent }   from './components/panel-pines-generar/panel-pines-generar.component';
import { PanelInscritosComponent }      from './components/panel-inscritos/panel-inscritos.component';
import { PanelAdmitidosVerComponent }   from './components/panel-admitidos-ver/panel-admitidos-ver.component';
import { PanelMatriculadosComponent }   from './components/panel-matriculados/panel-matriculados.component';
import { PanelTransaccionesComponent }  from './components/panel-transacciones/panel-transacciones.component';
import { PanelAdministradoresComponent }from './components/panel-administradores/panel-administradores.component';
import { PanelRegisterUserComponent }   from "./components/panel-register-user/panel-register-user.component";
import { PanelPinesGeneradosComponent } from './components/panel-pines-generados/panel-pines-generados.component';

//panel de padres de familia o niños
import { PinComponent }               from "./components/pin/pin.component";
import { PinLoginComponent }          from './components/pin-login/pin-login.component';
import { PinInscripcionesComponent }  from './components/pin-inscripciones/pin-inscripciones.component';
import { PinEntrevistasComponent }    from './components/pin-entrevistas/pin-entrevistas.component';
import { PinAdmitidosComponent }      from './components/pin-admitidos/pin-admitidos.component';
import { PinMatriculadosComponent }   from './components/pin-matriculados/pin-matriculados.component';

//servicios
import { GuardiaService }     from "./services/guardia.service";
import { GuardiaPinService }  from "./services/guardia-pin.service";

const ROUTES: Routes = [

  { path: 'login', component: PanelLoginComponent },
  { path: 'registrar-usuario', component: PanelRegisterUserComponent },    
  { path: 'panel', component: PanelComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio'},
      { path: 'inicio',         component:PanelInicioComponent },
      { path: 'generar-pin',    component:PanelPinesGenerarComponent },
      { path: 'pines-generados',component:PanelPinesGeneradosComponent },
      { path: 'inscritos',      component:PanelInscritosComponent },
      { path: 'admitidos',      component:PanelAdmitidosVerComponent },
      { path: 'matriculados',   component:PanelMatriculadosComponent },
      { path: 'transacciones',  component:PanelTransaccionesComponent },
      { path: 'administradores',component:PanelAdministradoresComponent }
    ],
    canActivate: [ GuardiaService ]
  },
  
  { path: 'pin', component: PinComponent,
    children:[
      { path: 'inscripciones',component:PinInscripcionesComponent },
      { path: 'entrevistas',  component:PinInscripcionesComponent },
      { path: 'admitidos',    component:PinInscripcionesComponent },
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
  PanelLoginComponent,
  PanelRegisterUserComponent,
  PanelComponent, 
  PanelInicioComponent, 
  PanelPinesGenerarComponent, 
  PanelInscritosComponent,
  PanelAdmitidosVerComponent,
  PanelMatriculadosComponent,
  PanelTransaccionesComponent,
  PanelAdministradoresComponent,
  PanelPinesGeneradosComponent,
  //pin components - componentes de pines 
  PinComponent,
  PinLoginComponent,
  PinInscripcionesComponent,
  PinAdmitidosComponent,
  PinEntrevistasComponent,
  PinMatriculadosComponent
];