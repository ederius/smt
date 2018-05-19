import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth, } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import * as _ from "lodash";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NullAstVisitor } from '@angular/compiler';

@Injectable()
export class AutenticacionService{

  result:Observable<any>;
  authState:any=null;

  constructor(public afAuth: AngularFireAuth, private router:Router, private db:AngularFireDatabase) { 


  }


  registrar(usuario){
    return this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo, usuario.contrasena).then(user=>{
      usuario.uid=user.uid;
      return this.db.database.ref(`usuarios/${user.uid}`).set(usuario).then(function(snapshop){
        return user;
      });
     });

  }

  listarUsuarios(){
    return this.db.database.ref(`usuarios`).once('value').then(function(snapshop){
      return _.map(snapshop.val());
    });
  }


  login(correo, contrasena){

    return this.afAuth.auth.signInWithEmailAndPassword(correo, contrasena)
    
  }

  getSession(){
    return new Promise((resolved, reject)=>{
      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth!=null ? auth.toJSON() : auth;
        resolved(this.authState);
      });
    });
  }

  getRollUser(){
    this.authenticated
    return new Promise((resolve, reject)=>{
      if(this.authState){
        var user = this.authState;
          return this.db.database.ref(`usuarios/${user.uid}`).once('value').then((user)=>{
            resolve(user.val().tipo);
          });
      }else{
        resolve(null);
      }
    });
  }

  authenticated() {   
    return new Promise((resolved, reject)=>{
      this.getSession().then(user=>{
        console.log(user);
        user ? resolved(true) : resolved(false) ;
       });
    });
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
      .then(() =>{ 
        console.log("email sent")
        return true;
      })
      .catch((error) =>{
        console.log(error);
        return  false;
      });
  }


  //// Sign Out ////
  CerrarSession() {
    return this.afAuth.auth.signOut().then(data=>{
      return data;
    }).catch(error=>{
      return error;
    });
  }

  usuarioActualPin(){
    let pin = JSON.parse(localStorage.sesionPin);
    return pin;
  }

  verificarSesionActivaPin(){
    
    if(localStorage.sesionPin){

      let sesion = JSON.parse(localStorage.sesionPin);
        switch (sesion.estado) {
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
          this.router.navigate(['/pin/matriculados']);
          break;
          
          default:
          break;
        }

      }else{
        this.router.navigate(['pin/login']);        
      }
    
  }
    
}
