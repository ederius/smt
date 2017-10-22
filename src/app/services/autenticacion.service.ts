import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth, } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AutenticacionService{

  result:Observable<any>;
  authState:any=null;

  constructor(public afAuth: AngularFireAuth, private router:Router) { 


  }


  registrar(correo, contrasena){

     return this.afAuth.auth.createUserWithEmailAndPassword(correo, contrasena);

  }


  login(correo, contrasena){

    return this.afAuth.auth.signInWithEmailAndPassword(correo, contrasena)
    
  }

  getSession(){
    return this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      return this.authState;      
    });
  }

  get authenticated(): boolean {    
    return this.getSession() != null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
      var auth = firebase.auth();
  
      return auth.sendPasswordResetEmail(email)
        .then(() => console.log("email sent"))
        .catch((error) => console.log(error))
    }
  
  
    //// Sign Out ////
    CerrarSession() {
      return this.afAuth.auth.signOut().then(data=>{
        return data;
      }).catch(error=>{
        return error;
      });
    }

}
