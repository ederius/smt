import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";


@Component({
  selector: 'app-panel-login',
  templateUrl: './panel-login.component.html',
  styleUrls: ['./panel-login.component.css']
})
export class PanelLoginComponent implements OnInit {

  forma:FormGroup;
  loginError:string;
  authState:any;
  errorSendEmail:any;

  constructor(public _authService:AutenticacionService, public router:Router) {

    this.forma = new FormGroup({
      'correo'      : new FormControl('', [Validators.email, Validators.required]),
      'contrasena'  : new FormControl('', [Validators.minLength(6), Validators.required])
    });

    //Validando si el usuario tiene una sesion iniciada, si la tiene se redirige a panel
    this._authService.getSession().then(user=>{
      if(user){
        this.router.navigate(['/panel']);
      }
    });

   }

  ngOnInit() {
  }


  login() {
    
        this._authService.login(this.forma.value.correo, this.forma.value.contrasena)
        .then(data=>{
          this.authState = data;     
          console.log(data);
               
          if (data.emailVerified) {
              this.router.navigate(['/panel']);
          }else{
            this.loginError = "Verifique su correo antes de iniciar sesión"
          }
          
        })
        .catch(error=>{
          switch (error.code) {
            case "auth/user-not-found":
              this.loginError = "Correo no registrado"
              break;
            case "auth/wrong-password":
              this.loginError = "Contrasena invalida"
              break;
            case "auth/invalid-email":
              this.loginError = "Formato de correo invalido"
              break;
            case "auth/too-many-requests":
              this.loginError= "Has sido bloqueado por seguridad, vuelve a intentarlo mas tarde!  "
          
            default:
              break;
          }             
        
        });
    
      }


}
