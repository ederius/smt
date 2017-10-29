import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-pin-admitidos',
  templateUrl: './pin-admitidos.component.html',
  styleUrls: ['./pin-admitidos.component.css']
})
export class PinAdmitidosComponent implements OnInit {

  constructor(private _auth: AutenticacionService) {
    //validando si ya inicio sesion
    this._auth.verificarSesionActivaPin();
   }

  ngOnInit() {
  }

}
