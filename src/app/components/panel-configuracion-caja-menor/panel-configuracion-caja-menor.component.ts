import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from "moment-timezone";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";
moment.locale('es');
moment.tz("America/Los_Angeles");


//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { CajaMenorService } from "../../services/caja-menor.service";


@Component({
  selector: 'app-panel-configuracion-caja-menor',
  templateUrl: './panel-configuracion-caja-menor.component.html',
  styleUrls: ['./panel-configuracion-caja-menor.component.css']
})
export class PanelConfiguracionCajaMenorComponent implements OnInit {

  fechaApertura:Date;
  fechaCierre:Date;
  saldoApertura:Number;
  saldoCierre:Number;
  ListaCajas:Array<any>;

  constructor(
    private _auth: AutenticacionService, 
    private router: Router,
    private _cajaMenorService: CajaMenorService,
    private modalService: NgbModal
  ) { 
    this.listarCajas();
  }

  ngOnInit() {
  }

  listarCajas(){
    this._cajaMenorService.listarCajasMenor().then(cajasMenor=>{
      console.log(cajasMenor);
      this.ListaCajas = cajasMenor;
    })
  }

  modalCrearCajaMenor(content){
    this.fechaApertura = moment().format('MMMM Do YYYY, h:mm a');
    this.saldoApertura = 0;
    this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
    }, (reason) => {
    });
  }

  crearCajaMenor(){
    this._cajaMenorService.listarCajasMenor().then(cajasMenores=>{
      if(cajasMenores.length>0){
        var cajaActica = _.find(cajasMenores, function(o) { return o.activa == true; });
        cajaActica.saldoCierre == undefined ? cajaActica.saldoCierre = cajaActica.saldoApertura : cajaActica ;
        cajaActica.fechaCierre = moment().format('MMMM Do YYYY, h:mm:ss a');
        cajaActica.activa = false;
        return this._cajaMenorService.actualizarCajaMenor(cajaActica);         
      }else{
        return ;
      }
    }).then(anteriorCajaMenor=>{
      return this._cajaMenorService.abrirCajaMenor(this.saldoApertura);
    }).then(response=>{
      this.listarCajas();
    }).catch(error=>{
      console.log("error crean caja menor :", error);
      
    })
    
  }

}
