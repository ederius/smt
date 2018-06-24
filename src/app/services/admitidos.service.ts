import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";

//SERVICES
import { SemestresService } from "../services/semestres.service";

@Injectable()
export class AdmitidosService {

  constructor(
    private db:AngularFireDatabase,
    private _semestresServices:SemestresService
  ) { }

  agregar(admitido){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/admitidos/${admitido.pin}`).set(admitido).then(function(data){
        return data;
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

  sumarAdmision(){
    let date = new Date();
    let ano = date.getFullYear();
    let self = this;
    this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      this.db.database.ref(`semestres/${ano}/${semestre}/alumnAdmitidos`).once('value').then(function(snapshop){
        let alumnAdmitidos = snapshop.val();
        if(alumnAdmitidos){
          alumnAdmitidos = { value : alumnAdmitidos.value + 1 };
          self.db.database.ref(`semestres/${ano}/${semestre}/alumnAdmitidos`).update(alumnAdmitidos);  //Actualizando estado de pin
        }else{
          alumnAdmitidos = {value : 1 };
          self.db.database.ref(`semestres/${ano}/${semestre}/alumnAdmitidos`).update(alumnAdmitidos);  //Actualizando estado de pin
        }
      }).catch((error)=>{
        console.error(error);
      })                             
    }).catch((error)=>{
      console.error(error);
    })  
  }

  listarAdmitidos(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/admitidos`).once('value').then(function(data){
        return _.map(data.val());
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

  eliminarAdmitido(pin){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/admitidos/${pin}`).remove(); 
    }).catch((error)=>{
      return error
    });         
  }

  obtenerRequerimientos(pin){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/requisitosMatricula/${pin}`).once('value').then(function(data){
        return data.val();
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

  obtenerRequerimientos2(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/requisitosMatricula/`).once('value').then(function(data){
        return _.map(data.val());
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

  guardarRequerimientos(pin, data){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/requisitosMatricula/${pin}/`).set(data).then(function(data){
        return _.map(data.val());
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

  actualizar(pin, data){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/admitidos/${pin}`).update(data).then(function(data){
        return data.val();
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      return error
    });
  }

}
