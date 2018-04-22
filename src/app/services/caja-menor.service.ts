import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as moment from "moment-timezone";
import * as _ from "lodash";

@Injectable()
export class CajaMenorService {

  constructor(private db:AngularFireDatabase) { }



  guardarGasto(gasto){
    var ref = this.db.database.ref().child('cajaMenor').push();
    gasto.key = ref.key;
    return this.db.database.ref(`cajaMenor/${ref.key}`).set(gasto).then(function(snapshop){
      return snapshop;
    });
  }

  guardarUnGasto(gasto){
    return this.db.database.ref(`cajaMenor/${gasto.key}`).set(gasto).then(function(snapshop){
      return snapshop;
    });
  }

  obtenerGastos(){
    return this.db.database.ref('cajaMenor').once('value').then(function(snapshop){
      return _.map(snapshop.val());
    });
  }


}
