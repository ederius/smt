import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma:FormGroup;
  loginError:string;
  authState:any;
  errorSendEmail:any;

  constructor(public _usuarioService:AutenticacionService, public router:Router) {

    this.forma = new FormGroup({
      'correo'      : new FormControl('', [Validators.email, Validators.required]),
      'contrasena'  : new FormControl('', [Validators.minLength(6), Validators.required])
    });

    //Validando si el usuario tiene una sesion iniciada, si la tiene se redirige a panel
    if(this._usuarioService.currentUser){
      this.router.navigate(['/panel']);
    }  

    

   }

  ngOnInit() {
  }


  login() {
    
        this._usuarioService.login(this.forma.value.correo, this.forma.value.contrasena)
        .then(data=>{
          console.log(data);
          this.authState = data;          
          if (data.emailVerified) {
              this.router.navigate(['/panel']);
          }else{
            this.loginError = "Verifique su correo antes de iniciar sesión"
          }
          
        })
        .catch(error=>{

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
