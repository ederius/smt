import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";

//SERVICES
import { SemestresService } from "../services/semestres.service";


@Injectable()
export class AgendaService {

  constructor(
    private db:AngularFireDatabase,
    private _semestresServices:SemestresService
  ) { }

  consultarAgenda(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/citasExamenesAdmision`).once('value').then(function(data){
        return data.val();
      });
    }).catch((error)=>{
      return error
    });
  }

  guardarCalificacion(pin, calificacion){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/examenesAdmision/${pin}`).update(calificacion).then(function(data){
        return data;
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

  consultarCalificacion(pin:string=""){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/examenesAdmision/${pin}`).once('value').then(function(data){
        return data.val();
      });
    }).catch((error)=>{
      return error
    });
  }


  consultarCalificacion2(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/examenesAdmision`).once('value').then(function(data){
        return data.val();
      });
    }).catch((error)=>{
      return error
    });
  }

  imprimir(content){
    var newWin= window.open("");
    newWin.document.write(content);
    newWin.print();
    newWin.close();
  }

}
