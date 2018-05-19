import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-panel-remenber-password-user',
  templateUrl: './panel-remenber-password-user.component.html',
  styleUrls: ['./panel-remenber-password-user.component.css']
})
export class PanelRemenberPasswordUserComponent implements OnInit {

  forma:FormGroup;
  loginError:string;
  authState:any;
  errorSendEmail:any;
  resetPassword:String;
  resetPasswordError:String;

  constructor(public _authService:AutenticacionService, public router:Router) {
    this.forma = new FormGroup({
      'correo'      : new FormControl('', [Validators.email, Validators.required])
    });
   }

  ngOnInit() {
  }

  recuperarContrasena(){
    var correo = this.forma.value.correo
    this._authService.resetPassword(correo).then(response=>{
      if(!response){
        this.resetPassword = "";
        this.resetPasswordError = "Error, el correo digitado no se encuentra registrado"; 
      }else{
        this.resetPasswordError = "";
        this.resetPassword = "Fue enviado a su correo un mensaje con instrucciones para cambiar su contraseña"
      }
    }).catch(error=>{
      console.log("error");
      console.log(error); 
    });
  }

}
