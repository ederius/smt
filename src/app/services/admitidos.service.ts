import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";

@Injectable()
export class AdmitidosService {

  constructor(
    private db:AngularFireDatabase
  ) { }

  agregar(admitido){
    return this.db.database.ref(`admitidos/${admitido.pin}`).set(admitido).then(function(data){
      return data;
    }).catch((error)=>{
      return error
    });
  }

  listarAdmitidos(){
    return this.db.database.ref(`admitidos`).once('value').then(function(data){
      return _.map(data.val());
    }).catch((error)=>{
      return error
    });
  }

  eliminarAdmitido(pin){
    return this.db.database.ref(`admitidos/${pin}`).remove();          
  }

  obtenerRequerimientos(pin){
    return this.db.database.ref(`requisitosMatricula/${pin}`).once('value').then(function(data){
      return data.val();
    }).catch((error)=>{
      return error
    });
  }

  obtenerRequerimientos2(){
    return this.db.database.ref(`requisitosMatricula/`).once('value').then(function(data){
      return _.map(data.val());
    }).catch((error)=>{
      return error
    });
  }

  guardarRequerimientos(pin, data){
    return this.db.database.ref(`requisitosMatricula/${pin}/`).set(data).then(function(data){
      return _.map(data.val());
    }).catch((error)=>{
      return error
    });
  }

}
