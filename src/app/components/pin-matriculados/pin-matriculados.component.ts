import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-pin-matriculados',
  templateUrl: './pin-matriculados.component.html',
  styleUrls: ['./pin-matriculados.component.css']
})
export class PinMatriculadosComponent implements OnInit {

  constructor(private _auth: AutenticacionService) {
    //validando si ya inicio sesion
    this._auth.verificarSesionActivaPin();
   }

  ngOnInit() {
  }

}
