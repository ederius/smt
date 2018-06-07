import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable} from "rxjs/Observable";
import * as _ from "lodash";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";
import { UtilsService } from "../../services/utils.service";
import { AdmitidosService } from "../../services/admitidos.service";
import { PinesService } from "../../services/pines.service";
import { MatriculadosService } from "../../services/matriculados.service";


@Component({
  selector: 'app-panel-admitidos-ver',
  templateUrl: './panel-admitidos-ver.component.html',
  styleUrls: ['./panel-admitidos-ver.component.css']
})
export class PanelAdmitidosVerComponent implements OnInit {

  inscritos:Array<any>;
  admitidos:Array<any>;
  admitido:any;
  adm:any;
  documentoID:boolean;
  fotos:boolean;
  pago:boolean;
  certificadoMedico:boolean;
  certificadoEPS:boolean;
  exito:string;
  error:any;

  constructor(
      private _auth: AutenticacionService, 
      private _inscripcionesService:InscripcionesService,
      private router: Router,
      private Utils:UtilsService,
      private _admitidosService:AdmitidosService,
      private modalService: NgbModal,
      private _pinesService:PinesService,
      private _matriculadosService:MatriculadosService
  ) {
        
      this.listarAdmitidos();
   }

  ngOnInit() {
  }

  listarAdmitidos(){
    this._admitidosService.listarAdmitidos().then((admitidos)=>{
      this._admitidosService.obtenerRequerimientos2().then((requisitos)=>{
        if(requisitos){
          _.forEach(admitidos, (a, index1)=>{ 
            _.forEach(requisitos, (r, index2)=>{               
              if(a.pin == r.pin){ 
                admitidos[index1].documentoID=r.documentoID;
                admitidos[index1].fotos=r.fotos;
                admitidos[index1].pago=r.pago;
                admitidos[index1].certificadoMedico=r.certificadoMedico;
                admitidos[index1].certificadoEPS=r.certificadoEPS;
              }
            });
            console.log(`${admitidos.length - 1} == ${index1}`);
            if(parseInt(index1) == (admitidos.length-1) ){ this.admitidos = admitidos; console.log(admitidos);
             }
          });
        }else{
          this.admitidos = admitidos;
        }
      });
    });
  }

  exportarExcel(){
    
    _.forEach(this.admitidos, function(pin, index){                                                   //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        this.admitidos[index] = pin;
      }
    });

    this.Utils.exportarExcel(this.admitidos, 'Reporte-de-admitidos');
  
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

  matricularModal(admitido, content){
    this.admitido = admitido;
    this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.admitido[admitido.id]=false;               //Devolviendo switch a su estado original 
    }, (reason) => {
      let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("cerre");
    });
  }


  matricular(){
    let admitido = this.admitido;
    this._matriculadosService.agregar(admitido).then((response1)=>{
      return this._admitidosService.eliminarAdmitido(admitido.pin);
    }).then((response2)=>{
      return this._pinesService.actualizarEstado(admitido.pin, 4);
    }).then((response3)=>{
      this.listarAdmitidos();
    })
    .catch((error)=>{
      console.log(error);
    });

  }


  detallesAdmitido(id, content){
    let admitidos
    if(admitidos = this.admitidos){ //Mapeando como un array la promesa
      for(let i = 0; i< admitidos.length; i++){
        if(admitidos[i].id==id){ 
          this.adm = admitidos[i]; 
        }  
      };
    }
    
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editarAdmitidos(id){

  }

  requerimientosModal(admitido, content){
    this.admitido = admitido;
    this._admitidosService.obtenerRequerimientos(admitido.pin).then((data)=>{
      if(data){       
        this.documentoID=data.documentoID;
        this.fotos=data.fotos;
        this.pago=data.pago;
        this.certificadoMedico=data.certificadoMedico;
        this.certificadoEPS=data.certificadoEPS;
      }
        this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
        //this.closeResult = `Closed with: ${result}`;
        //this.admitido[admitido.id]=false;               //Devolviendo switch a su estado original 
      }, (reason) => {
        let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("cerre");
      });
    

   });
  }

  guardarRequerimientos(){
   this.exito="";
    let data = {
      documentoID:this.documentoID ? this.documentoID : false,
      fotos:this.fotos ? this.fotos : false,
      pago:this.pago ? this.pago : false,
      certificadoMedico:this.certificadoMedico ? this.certificadoMedico : false,
      certificadoEPS:this.certificadoEPS ? this.certificadoEPS : false,
      pin:this.admitido.pin,
    }
    this._admitidosService.guardarRequerimientos(this.admitido.pin, data).then((response)=>{
      this.exito="Los requerimientos han sido guardados con exito."
      this.listarAdmitidos();
    }).catch((error)=>{
      this.error="Ups... algo a salido mal, intentelo mas tarde."
    });
  }




}
