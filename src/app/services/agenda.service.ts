import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";

@Injectable()
export class AgendaService {

  constructor(private db:AngularFireDatabase) { }

  consultarAgenda(){
    return this.db.database.ref('citasExamenesAdmision').once('value').then(function(data){
      return data.val();
    });
  }

  guardarCalificacion(pin, calificacion){
    return this.db.database.ref(`examenesAdmision/${pin}`).update(calificacion).then(function(data){
      return data;
    }).catch((error)=>{
      return error
    });
  }

  consultarCalificacion(pin:string=""){
    return this.db.database.ref(`examenesAdmision/${pin}`).once('value').then(function(data){
      return data.val();
    });
  }


  consultarCalificacion2(){
    return this.db.database.ref(`examenesAdmision`).once('value').then(function(data){
      return data.val();
    });
  }

  imprimir(content){
    var newWin= window.open("");
    newWin.document.write(content);
    newWin.print();
    newWin.close();
  }

}
