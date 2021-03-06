import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as _ from "lodash";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";
import { UtilsService } from "../../services/utils.service";
import { AgendaService } from "../../services/agenda.service";
import { PinesService } from "../../services/pines.service";
import { AdmitidosService } from "../../services/admitidos.service";


@Component({
  selector: 'app-panel-calificacion',
  templateUrl: './panel-calificacion.component.html',
  styleUrls: ['./panel-calificacion.component.css']
})
export class PanelCalificacionComponent implements OnInit {

  inscritos:any;
  inscrito:any;
  buscar:string;
  tipoOrden:any;
  admitido:any = {};


  ordenar:any=[
    {name:"Ordenar por", value:""},
    {name:"Por identificación", value:"id"},    
    {name:"Por nombres", value:"nombres"},
    {name:"Por apellidos", value:"apellidos"},
    {name:"Por grado", value:"grado"}    
  ]; 

  constructor(   
    private _auth: AutenticacionService, 
    private _pinesService:PinesService,
    private _inscripcionesService:InscripcionesService,
    private router: Router,
    private Utils:UtilsService,
    private _agendaSevice:AgendaService,
    private modalService: NgbModal,    
    private _admitidosService:AdmitidosService
  ) {
    this.listarInscritos();
   }

  ngOnInit() {
  }


  listarInscritos(){
    let inscritos = [];
    this._inscripcionesService.listarInscritos().then((data1:any)=>{
      this._agendaSevice.consultarCalificacion2().then((data2)=>{
        let keys = Object.keys(data2);
        _.forEach(data1, function(inscrito1:any, index1){
          _.forEach(keys, function(key, index2){
            if(inscrito1.pin == key){
              inscrito1.calificacionCastellano = data2[key].calificacionCastellano;
              inscrito1.calificacionMatematica = data2[key].calificacionMatematica;
              inscrito1.calificacionLectura = data2[key].calificacionLectura;
              inscrito1.calificacionEntrevista = data2[key].calificacionEntrevista;
              data1[index1] = inscrito1;             
            }
          });
        });
        this.inscritos = data1;
        console.log(this.inscritos);        
      }).catch((error)=>{
        console.error(error);
      })
    });
  }

  exportarExcel(){
    
    let inscritos = this.inscritos;         //Mapeando como un array la promesa
    _.forEach(inscritos, function(pin, index){        //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        inscritos[index] = pin;
      }
    });

    this.Utils.exportarExcel(inscritos, 'Reporte-de-inscritos');
  
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  admitirModal(inscrito, content){
    this.inscrito = inscrito;
    this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.admitido[inscrito.id]=false;               //Devolviendo switch a su estado original 
    }, (reason) => {
      let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("cerre");
    });
  }

  admitir(){
    let inscrito = this.inscrito;
    this._admitidosService.agregar(inscrito).then((response1)=>{
      return this._inscripcionesService.admitirInscrito(inscrito.pin);
    }).then((response2)=>{
      this._admitidosService.sumarAdmision();
      return this._pinesService.actualizarEstado(inscrito.pin, 3);
    }).then((response3)=>{
      this.listarInscritos();
      this.getDismissReason
    })
    .catch((error)=>{
      console.log(error);
    });

  }
  

}
