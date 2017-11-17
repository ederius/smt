import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from "@angular/forms";
import { AutenticacionService } from "../../services/autenticacion.service";



@Component({
  selector: 'app-panel-register-user',
  templateUrl: './panel-register-user.component.html',
  styleUrls: ['./panel-register-user.component.css']
})
export class PanelRegisterUserComponent implements OnInit {
  
  forma:FormGroup;
  loginError:string;
  registro:boolean;
  

  constructor(public _usuarioService:AutenticacionService) {

      this.forma = new FormGroup({
        'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
        'contrasena': new FormControl('', [Validators.required, Validators.minLength(6)]),
      });

   }

  ngOnInit() {
  }

  registrarUsuario() {

    this._usuarioService.registrar(this.forma.value.correo, this.forma.value.contrasena)
    .then(data=>{
      
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
          break;
        case "auth/weak-password":
          this.loginError = "Contraseña muy debil, minimo debe tener 6 caracteres"
          break;
        case "auth/invalid-email":
          this.loginError = "Formato de correo invalido"
          break;
      
        default:
          break;
      }    
    
    });

  }

}
