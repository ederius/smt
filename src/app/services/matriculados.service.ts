import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";

@Injectable()
export class MatriculadosService {

  constructor(
    private db:AngularFireDatabase
  ) { }

  agregar(admitido){
    return this.db.database.ref(`matriculados/${admitido.pin}`).set(admitido).then(function(data){
      return data;
    }).catch((error)=>{
      return error
    });
  }

  listarMatriculados(){
    return this.db.database.ref(`matriculados`).once("value").then(function(data){
      return _.map(data.val());
    }).catch((error)=>{
      return error
    });
  }

}