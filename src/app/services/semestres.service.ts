import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as moment from "moment-timezone";
import * as _ from "lodash";
moment.locale('es');
moment.tz("America/Los_Angeles");


@Injectable()
export class SemestresService {

  constructor(private db:AngularFireDatabase) { }

  obtenerSemestres(){
    return this.db.database.ref(`semestres`).once('value').then(function(snapshop){      
      return snapshop.val();
    });
  }

  obtenerUltimoSemestre(){
    return this.db.database.ref(`semestres`).limitToLast(1).once('value').then(function(snapshop){      
      return snapshop.val();
    });
  }

  crearSemestre(numSemestre, forma){
    let date = new Date();
    forma.fechaApertura = moment().format();      //obteniendo fecha y hora actual  
    let ano = date.getFullYear();
    forma.semestre = `${numSemestre}/${ano}`;
    forma.fechaCierre = 'N/A'; 
    return this.db.database.ref(`semestres/${ano}/${numSemestre}`).set(forma).then(function(snapshop){
      return snapshop;
    });
  }

  cerrarSemestre(numSemestre, ano, forma){
    forma.fechaCierre = moment().format();      //obteniendo fecha y hora actual  
    return this.db.database.ref(`semestres/${ano}/${numSemestre}`).update(forma).then(function(snapshop){
      return _.map(snapshop);
    });
  }

}
