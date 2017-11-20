import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AutenticacionService } from "./autenticacion.service";


@Injectable()
export class GuardiaService implements CanActivate {

  constructor(private _auth:AutenticacionService) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){

    if (this._auth.currentUser) {
      console.log("paso");
      return true;
    }else{   
      console.log("no paso");
      return true;
    }
  }

}
