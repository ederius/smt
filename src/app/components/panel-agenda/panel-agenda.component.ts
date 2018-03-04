import { Component, OnInit } from '@angular/core';
//SERVICES
import { AgendaServicesService } from "../../services/agenda.service";
import { UtilsService } from "../../services/utils.service";
import { InscripcionesService } from "../../services/inscripciones.service";


//PACKAGE
import * as _ from "lodash";



@Component({
  selector: 'app-panel-agenda',
  templateUrl: './panel-agenda.component.html',
  styleUrls: ['./panel-agenda.component.css']
})
export class PanelAgendaComponent implements OnInit {

  agenda:any;
  entrevistasInscritos:Array<any>=[];
  examenesInscritos:Array<any>=[];

  constructor(
    private _agendaSevice:AgendaServicesService, 
    public _Utils:UtilsService, 
    private _inscripcionesServices:InscripcionesService
  ) { }

  ngOnInit() {
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
                console.log(this.entrevistasInscritos);
              }).catch((error)=>{ 
                console.error(error)
              });
          }  
        });
        _.forEach(data, (value2, index2)=>{        
          if(value2.fechaExamenes.day == this.agenda.day && value2.fechaExamenes.year == this.agenda.year && value2.fechaExamenes.month == this.agenda.month ){
            return this._inscripcionesServices.consultarInscrito(index2).then((data2)=>{
              this.examenesInscritos.push(Object.assign({}, value2, data2));
              console.log(this.examenesInscritos)
            }).catch(()=>{})
          }  
        });
        
    }, (error)=>{
      console.log(error);
    });
  }

}
