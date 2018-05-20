import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as moment from "moment-timezone";
moment.locale('es');
moment.tz("America/Los_Angeles");
import * as _ from "lodash";

@Injectable()
export class CajaMenorService {

  constructor(private db:AngularFireDatabase) { }

  guardarMovimiento(key, movimiento, saldoCierre){
    var self = this;
    var ref = this.db.database.ref().child(`cajaMenor/${key}/movimientos/`).push();
    return this.db.database.ref(`cajaMenor/${key}/movimientos/${ref.key}`).set(movimiento).then(function(snapshop){
        self.db.database.ref(`cajaMenor/${key}`).update({saldoCierre:saldoCierre})
        return snapshop;
    });
  }


  actualizarMovimiento(key, movimiento, saldoCierre){
    var self = this;
    return this.db.database.ref(`cajaMenor/${key}/movimientos/${movimiento.key}`).set(movimiento).then(function(snapshop){
        self.db.database.ref(`cajaMenor/${key}`).update({saldoCierre:saldoCierre})
        return snapshop;
    });
  }


  actualizarCajaMenor(caja){
    return this.db.database.ref(`cajaMenor/${caja.key}`).set(caja).then(function(snapshop){
      return snapshop;
    });
  }

  obtenerGastos(){
    return this.db.database.ref('cajaMenor').once('value').then(function(snapshop){
      return _.map(snapshop.val());
    });
  }

  listarCajasMenor(){
    return this.db.database.ref('cajaMenor').once('value').then(function(snapshop){
      return _.map(snapshop.val());
    });
  }

  abrirCajaMenor(saldoApertura){
    var ref = this.db.database.ref().child('cajaMenor').push();
    var data = {activa:true, key:ref.key, fechaApertura:moment().format('MMMM Do YYYY, h:mm:ss a'), saldoApertura:saldoApertura};
    return this.db.database.ref(`cajaMenor/${ref.key}`).set(data).then(function(snapshop){
      return snapshop;
    });
  }

  cerrarCajaMenor(){

  }


}
