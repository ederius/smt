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
        //Validando si el usuario tiene una sesion iniciada, si la tiene se redirige a panel
        if(!this._auth.currentUser){
          this.router.navigate(['/login']);
        }   
        
        this.listarAdmitidos();
   }

  ngOnInit() {
  }

  listarAdmitidos(){
    this._admitidosService.listarAdmitidos().then((data)=>{
      this.admitidos = data; 
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


  detallesAdmitidos(id){
    
  }

  editarAdmitidos(id){

  }


}
