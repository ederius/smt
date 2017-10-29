import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";


@Component({
  selector: 'app-pin-inscripciones',
  templateUrl: './pin-inscripciones.component.html',
  styleUrls: ['./pin-inscripciones.component.css']
})
export class PinInscripcionesComponent implements OnInit {

  constructor(private _auth: AutenticacionService) {
      //validando si ya inicio sesion
      this._auth.verificarSesionActivaPin();
   }

  ngOnInit() {
  }

}
