import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

//SERVICES
import { AutenticacionService } from "../../services/autenticacion.service";
import { AgendaService } from "../../services/agenda.service";
import { UtilsService } from "../../services/utils.service";
import { InscripcionesService } from "../../services/inscripciones.service";


//PACKAGE
import * as _ from "lodash";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { log } from 'util';




@Component({
  selector: 'app-panel-agenda',
  templateUrl: './panel-agenda.component.html',
  styleUrls: ['./panel-agenda.component.css']
})
export class PanelAgendaComponent implements OnInit {

  agenda:any;
  entrevistasInscritos:Array<any>=[];
  examenesInscritos:Array<any>=[];

  inscrito:any;
  calificacionCastellano:number;
  calificacionMatematica:number;
  calificacionLectura:number;  
  calificacionEntrevista:number;
  actualizadaExitosamenteEntrevista:boolean=false;
  actualizadaExitosamenteCalificaciones:boolean=false;

  constructor(
    private _auth: AutenticacionService, 
    private _agendaSevice:AgendaService, 
    public _Utils:UtilsService, 
    private router: Router,
    private _inscripcionesServices:InscripcionesService,
    private modalService: NgbModal    
  ) { 

    

    //this.consultarAgenda();
  }

  ngOnInit() {
    const now = new Date();
    this.agenda = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  consultarAgenda(){
    this.entrevistasInscritos = [];
    this.examenesInscritos = [];
    this._agendaSevice.consultarAgenda().then((data)=>{
      let datos:Array<any> = _.map(data);
        _.forEach(data, (value1, index1)=>{        
          if(value1.fechaEntrevista.day == this.agenda.day && value1.fechaEntrevista.year == this.agenda.year && value1.fechaEntrevista.month == this.agenda.month ){
              return this._inscripcionesServices.consultarInscrito(index1).then((data1)=>{
                this.entrevistasInscritos.push(Object.assign({}, value1, data1));
              }).catch((error)=>{ 
                console.error(error)
              });
          }  
        });
        _.forEach(data, (value2, index2)=>{        
          if(value2.fechaExamenes.day == this.agenda.day && value2.fechaExamenes.year == this.agenda.year && value2.fechaExamenes.month == this.agenda.month ){
            return this._inscripcionesServices.consultarInscrito(index2).then((data2)=>{
              this.examenesInscritos.push(Object.assign({}, value2, data2));
            }).catch(()=>{})
          }  
        });
        
    }, (error)=>{
      console.log(error);
    });
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

  modalAsignarCalificacionEntrevista(inscrito, contentModal){
      this.actualizadaExitosamenteEntrevista=false;
      this.inscrito = inscrito; 
      let closeResult
      //consultando calificacion si en caso de que tenga algunas
      this._agendaSevice.consultarCalificacion(inscrito.pin).then((data)=>{
        this.calificacionEntrevista = data.calificacionEntrevista;
      }).catch((error)=>{
        console.error(error);
      })
      //Abriendo modal para ver o insertar calificación de la entrevista con papas
      this.modalService.open(contentModal, {size: 'xl' as 'lg'}).result.then((result) => {
        closeResult = `Closed with: ${result}`;
      }, (reason) => {
        closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }

  modalAsignarCalificacionExamenes(inscrito, contentModal){
      this.actualizadaExitosamenteCalificaciones=false;
      this.inscrito = inscrito; 
      let closeResult
      //consultando calificacion si en caso de que tenga algunas
      this._agendaSevice.consultarCalificacion(inscrito.pin).then((data)=>{
        this.calificacionCastellano = data.calificacionCastellano;
        this.calificacionMatematica = data.calificacionMatematica;
        this.calificacionLectura = data.calificacionLectura;
      }).catch((error)=>{
        console.error(error);
      })
      //Abriendo modal para ver o insertar calificación de la entrevista con papas
      this.modalService.open(contentModal, {size: 'xl' as 'lg'}).result.then((result) => {
        closeResult = `Closed with: ${result}`;
      }, (reason) => {
        closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }

  guardarCalificacionEntrevista(){
    let pin = this.inscrito.pin
    let calificacion = { calificacionEntrevista:this.calificacionEntrevista };
    this._agendaSevice.guardarCalificacion(pin,calificacion).then((data)=>{
      this.actualizadaExitosamenteEntrevista=true;
      setTimeout(function(){
        this.actualizadaExitosamenteEntrevista=false;
      }, 5000)
    }).catch((error)=>{
      console.error(error);
    })
    
  }


  guardarCalificacionExamenes(){
    let pin = this.inscrito.pin
    let calificacion = { 
      calificacionCastellano : this.calificacionCastellano,
      calificacionMatematica : this.calificacionMatematica,
      calificacionLectura : this.calificacionLectura
     };
    this._agendaSevice.guardarCalificacion(pin,calificacion).then((data)=>{
      this.actualizadaExitosamenteCalificaciones=true;
      setTimeout(function(){
        this.actualizadaExitosamenteCalificaciones=false;
      }, 5000)
    }).catch((error)=>{
      console.error(error);
    });

  }

  imprimir(id){
    let divToPrint=document.getElementById(id).outerHTML;
    this._agendaSevice.imprimir(divToPrint);
  }
  

}
