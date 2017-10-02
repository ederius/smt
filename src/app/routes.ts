import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { PanelComponent } from './components/panel/panel.component';
import { InicioComponent } from "./components/inicio/inicio.component";
import { PinesComponent } from './components/pines/pines.component';
import { InscritosComponent } from './components/inscritos/inscritos.component';
import { AdmitidosComponent } from './components/admitidos/admitidos.component';
import { MatriculadosComponent } from './components/matriculados/matriculados.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';


const ROUTES: Routes = [
  { path: 'panel', component: PanelComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio'},
      { path: 'inicio', component:InicioComponent },
      { path: 'pines', component:PinesComponent },
      { path: 'inscritos', component:InscritosComponent },
      { path: 'admitidos', component:AdmitidosComponent },
      { path: 'matriculados', component:MatriculadosComponent },
      { path: 'transacciones', component:TransaccionesComponent },
      { path: 'administradores', component:AdministradoresComponent },
      
    ]
},
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo:'login' }
];

export const ROUTES_APP = RouterModule.forRoot(ROUTES, {useHash:true});

export const routedComponents = [
  PanelComponent,
  LoginComponent, 
  InicioComponent, 
  PinesComponent, 
  InscritosComponent,
  AdmitidosComponent,
  MatriculadosComponent,
  TransaccionesComponent,
  AdministradoresComponent

];