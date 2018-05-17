import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, NgModel } from "@angular/forms";
import * as _ from "lodash";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { MatriculadosService } from "../../services/matriculados.service";
import { UtilsService } from "../../services/utils.service";


@Component({
  selector: 'app-panel-matriculados',
  templateUrl: './panel-matriculados.component.html',
  styleUrls: ['./panel-matriculados.component.css']
})
export class PanelMatriculadosComponent implements OnInit {

  errorConsulta:String;
  exitoConsulta:String;
  exitoForma:Boolean;

  matriculados:Array<any>;
  matriculado:any;


  ordenar:any=[
    {name:"Ordenar por", value:""},
    {name:"Por tarjeta de I.", value:"id"},    
    {name:"Por nombres", value:"nombres"},
    {name:"Por apellidos", value:"apellidos"},
    {name:"Por celular Mama", value:"celularMama"},
    {name:"Por correo Mama", value:"correoMama"},
    {name:"Por grado", value:"grado"}    
  ]; 

  closeResult: string;


  constructor(
    private _auth: AutenticacionService, 
    private _matriculadosService:MatriculadosService,
    private router: Router,
    private Utils:UtilsService,
    private modalService: NgbModal,
    private http:Http
    ) { 

    this.listarMatriculados();
  }

  ngOnInit() {
  }

  listarMatriculados(){
    let matriculados
    this._matriculadosService.listarMatriculados().then((data)=>{
      this.matriculados = data;    
    });

  }

  exportarExcel(){

    let matriculados = this.matriculados;         //Mapeando como un array la promesa
    _.forEach(matriculados, function(pin, index){        //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        matriculados[index] = pin;
      }
    });

    this.Utils.exportarExcel(matriculados, 'Reporte-de-matriculados');
  
  }


  detallesMatriculado(id, content){
             
    let matriculados
    
    if(matriculados = this.matriculados){ //Mapeando como un array la promesa
      for(let i = 0; i< matriculados.length; i++){
        if(matriculados[i].id==id){ 
          this.matriculado = matriculados[i]; 
        }  
      };
    }
    
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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






}
