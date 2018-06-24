import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as moment from "moment-timezone";
import * as _ from "lodash";
moment.locale('es');
moment.tz("America/Los_Angeles");

//SERVICES
import { SemestresService } from "../services/semestres.service";

@Injectable()
export class InscripcionesService {

  constructor(private db:AngularFireDatabase, private _semestresServices:SemestresService) {
  }

  guardarInscripcion(forma){

    //obteniendo pin de sesion
    let ref = JSON.parse(localStorage.sesionPin);
    let pin = ref.pin;
    let fechaHora = moment().format();      //obteniendo fecha y hora actual  
    forma.creado = fechaHora;
    forma.admitido=false;
    let date = new Date();
    let ano = date.getFullYear();
    this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones/${pin}`).set(forma);                              //Guardando datos de inscripcion
      this.db.database.ref(`semestres/${ano}/${semestre}/pines/${pin}`).update({"estado":2, "actualizado":fechaHora});  //Actualizando estado de pin
    }).catch((error)=>{
      console.error(error);
    })
  }

  sumarInscripcion(){
    let date = new Date();
    let ano = date.getFullYear();
    let self = this;
    this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      this.db.database.ref(`semestres/${ano}/${semestre}/alumnInscritos`).once('value').then(function(snapshop){
        let alumnInscritos = snapshop.val();
        console.log("alumnInscritos mun");
        console.log(alumnInscritos);
        if(alumnInscritos){
          alumnInscritos = { value : alumnInscritos.value + 1 };
          self.db.database.ref(`semestres/${ano}/${semestre}/alumnInscritos`).update(alumnInscritos);  //Actualizando estado de pin
        }else{
          alumnInscritos = {value : 1 };
          self.db.database.ref(`semestres/${ano}/${semestre}/alumnInscritos`).update(alumnInscritos);  //Actualizando estado de pin
        }
      }).catch((error)=>{
        console.error(error);
      })                             
    }).catch((error)=>{
      console.error(error);
    })  
  }


  listarInscritos(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones`).once('value').then(function(snapshop){
        return _.map(snapshop.val());
      });
    }).catch((error)=>{
      console.error(error);
    })
  }

  obtenerInscritos(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones`).once('value').then(function(snapshop){
        return snapshop;
      });
    }).catch((error)=>{
      console.error(error);
    })
  }

  detallesInscrito(id){
    let inscritos:Array<any>;
    return new Promise(function(resolve, reject){
      let date = new Date();
      let ano = date.getFullYear();
      return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
        return this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones`).once('value').then(function(snapshop){
          inscritos = _.map(snapshop.val());
          let keys = Object.keys(inscritos);
          let inscrito;
          for(var i = 0; i>keys.length;i++){
            if(keys[i] == id){
              inscrito = inscritos[i];
              break;
            }
          }
          if(inscrito!=""){
            resolve(inscrito);
          }else{
            resolve(false);
          }
        });
      }).catch((error)=>{
        console.error(error);
      })
    });
  }

  consultarInscrito(pin){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones/${pin}`).once('value').then(function(snapshop){
        return snapshop.val();
      });
    }).catch((error)=>{
      console.error(error);
    })
  }

  actualizarInscrito(pin, inscrito){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones/${inscrito.pin}`).update(inscrito);      
    }).catch((error)=>{
      console.error(error);
    })
  }

  eliminarInscrito(pin){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones/${pin}`).remove();  
    }).catch((error)=>{
      console.error(error);
    })        
  }

  consultarCitas(pin){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/citasExamenesAdmision/${pin}`).once('value').then(function(snapshop){
        return snapshop.val();
      });
    }).catch((error)=>{
      console.error(error);
    })
  }

  asignarCitas(citas, pin){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      this.db.database.ref(`semestres/${ano}/${semestre}/citasExamenesAdmision/${pin}`).set(citas);
    }).catch((error)=>{
      console.error(error);
    })                              //Guardando datos de inscripcion
  }

  admitirInscrito(pin){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/inscripciones/${pin}`).update({admitido:true});
    }).catch((error)=>{
      console.error(error);
    })      
  }

}
