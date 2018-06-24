import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";

//SERVICES
import { SemestresService } from "../services/semestres.service";


@Injectable()
export class MatriculadosService {

  constructor(
    private db:AngularFireDatabase,
    private _semestresServices:SemestresService

  ) { }

  agregar(admitido){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/matriculados/${admitido.pin}`).set(admitido).then(function(data){
        return data;
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

  sumarMatriculado(){
    let date = new Date();
    let ano = date.getFullYear();
    let self = this;
    this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      this.db.database.ref(`semestres/${ano}/${semestre}/alumnMatriculados`).once('value').then(function(snapshop){
        let alumnMatriculados = snapshop.val();
        if(alumnMatriculados){
          alumnMatriculados = { value : alumnMatriculados.value + 1 };
          self.db.database.ref(`semestres/${ano}/${semestre}/alumnMatriculados`).update(alumnMatriculados);  //Actualizando estado de pin
        }else{
          alumnMatriculados = {value : 1 };
          self.db.database.ref(`semestres/${ano}/${semestre}/alumnMatriculados`).update(alumnMatriculados);  //Actualizando estado de pin
        }
      }).catch((error)=>{
        console.error(error);
      })                             
    }).catch((error)=>{
      console.error(error);
    })  
  }

  listarMatriculados(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/matriculados`).once("value").then(function(data){
        return _.map(data.val());
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

}
