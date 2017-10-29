import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-pin-entrevistas',
  templateUrl: './pin-entrevistas.component.html',
  styleUrls: ['./pin-entrevistas.component.css']
})
export class PinEntrevistasComponent implements OnInit {

  constructor(private _auth: AutenticacionService) { 
    //validando si ya inicio sesion
    this._auth.verificarSesionActivaPin();
  }

  ngOnInit() {
  }

}
