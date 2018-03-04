import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";
import { PinesService } from "../../services/pines.service";
import * as _ from "lodash";


@Component({
  selector: 'app-pin-login',
  templateUrl: './pin-login.component.html',
  styleUrls: ['./pin-login.component.css']
})
export class PinLoginComponent implements OnInit {

  forma: FormGroup;
  loginError: string;
  authState: any;
  errorSendEmail: any;

  constructor(private _auth: AutenticacionService, public router: Router, private _pinesService: PinesService) {
    //validando si ya inicio sesion
    this._auth.verificarSesionActivaPin();
    //Iniciando el formulario
    this.forma = new FormGroup({
      'pin': new FormControl('', [Validators.required]),
    });

  }

  ngOnInit() {
  }


  login(pin) {
    //Obteniendo los pines generados para ver si existe el que el usuario ingreso 
    this._pinesService.obtenerPines().then(data => {
      let datos:Array<any>=data;
      _.forEach(datos, (value, index) => { 
          
          if (value.pin == pin) {

            localStorage.sesionPin = JSON.stringify(value);

            //Redireccionando al usuario, dependiendo del estado en que se encuentre el proceso
            switch (value.estado) {
              case 1:
                this.router.navigate(['/pin/inscripciones']);
                break;
              case 2:
                this.router.navigate(['/pin/entrevistas']);
                break;
              case 3:
                this.router.navigate(['/pin/admitidos']);
                break;
              case 4:
                this.router.navigate(['/pin/matricula']);
                break;

              default:
                break;
            }

          } else {
            //Notificando que el pin no es valido.
            this.loginError = "Pin incorrecto"
          }

    });

    }).catch(error => {
      this.loginError="Upps! Algo ha ido mal, verifica tu conección a internet!";
      console.log(error);
      });

  }




}
