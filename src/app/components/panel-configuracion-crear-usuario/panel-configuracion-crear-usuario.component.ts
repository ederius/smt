import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from "@angular/forms";
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-panel-configuracion-crear-usuario',
  templateUrl: './panel-configuracion-crear-usuario.component.html',
  styleUrls: ['./panel-configuracion-crear-usuario.component.css']
})
export class PanelConfiguracionCrearUsuarioComponent implements OnInit {

  loginError:String;
  registro:Boolean;
  forma:FormGroup;


  constructor(public _usuarioService:AutenticacionService) {
    this.forma = new FormGroup({
      'tipo': new FormControl('', [Validators.required, Validators.required]),
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'contrasena': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
   }

  ngOnInit() {
  }


  registrarUsuario() {
    this._usuarioService.registrar(this.forma.value)  //Servicio para registrar en el servicio de authenticacion de firebase
    .then(data=>{
      console.log(data);
      this.loginError = "";
      data.refreshToken ? this.registro=true : this.registro=false;
      data.sendEmailVerification().then(              //Enviando correo de verificación
        (success) => {
          console.log("please verify your email");

        } 
      ).catch((err) => {
          console.log(err);
      });
    }).catch(error=>{
      switch (error.code) {
        case "auth/email-already-in-use":
          this.loginError = "Correo ya registrado"
          this.registro=false;
          break;
        case "auth/weak-password":
          this.loginError = "Contraseña muy debil, minimo debe tener 6 caracteres"
          this.registro=false;

          break;
        case "auth/invalid-email":
          this.loginError = "Formato de correo invalido"
          this.registro=false;
          break;
      
        default:
          break;
      }    
    });
  }

}
