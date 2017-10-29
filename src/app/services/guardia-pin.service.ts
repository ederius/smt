import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AutenticacionService } from "./autenticacion.service";


@Injectable()
export class GuardiaPinService implements CanActivate {

  constructor(private _auth:AutenticacionService) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    
    if (localStorage.sesionPin) {
      return true;
    }else{   
      return false;
    }
  }

}
