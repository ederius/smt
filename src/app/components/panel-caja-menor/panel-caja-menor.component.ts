import { Component, OnInit } from '@angular/core';
import * as moment from "moment-timezone";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";
moment.locale('es');
moment.tz("America/Los_Angeles");
import { Router } from "@angular/router";


//SERVICES
import { CajaMenorService } from "../../services/caja-menor.service";
import { log } from 'util';
import { AutenticacionService } from "../../services/autenticacion.service";


@Component({
  selector: 'app-panel-caja-menor',
  templateUrl: './panel-caja-menor.component.html',
  styleUrls: ['./panel-caja-menor.component.css']
})
export class PanelCajaMenorComponent implements OnInit {

  debe:Number;
  concepto:String;
  fecha:Date;
  haber:Number;
  fechaApertura:Date;
  saldoApertura:any;
  saldoFila:Number;
  saldoTotal:any;
  movimientos:Array<any>;
  movimientoEditar:String;
  successUpdate:String;
  errorUpdate:String;
  cajaActiva:any;

  closeResult:any;


  constructor(
    private _cajaMejorServices:CajaMenorService, 
    private modalService: NgbModal,
    private _auth: AutenticacionService,
    private router: Router

  ) { 
    this.listarMovimientos();
    this.fecha = moment().format('MMMM Do YYYY, h:mm a');      //obteniendo fecha y hora actual  
  }

  ngOnInit() {
  }

  listarMovimientos(){
    this._cajaMejorServices.listarCajasMenor().then(cajasMenores=>{
      this.cajaActiva = cajasMenores.pop();     
      this.movimientos = this.cajaActiva.movimientos ? _.map(this.cajaActiva.movimientos) : [];
      this.fechaApertura = this.cajaActiva.fechaApertura;
      this.saldoApertura = this.cajaActiva.saldoApertura;
      this.haber = 0 ;
      this.debe = 0 ;
      var saldoTotal, saldo=0, saldoApertura=parseInt(this.saldoApertura);
      _.forEach(this.movimientos, (o, index)=>{
        saldoApertura -= parseInt(o.haber);
        saldoApertura += parseInt(o.debe);
        this.movimientos[index].saldo=saldoApertura;
        if(this.movimientos.length-1 == index){
          saldoTotal = saldoApertura - saldo;
          this.saldoTotal = saldoTotal;                 
        }
      });
    });
  }

  guardarMovimiento(){ 
    var movimiento = {
      fecha:this.fecha,
      concepto:this.concepto,
      debe:this.debe,
      haber:this.haber
    }
    var saldo = this.saldoTotal;
    saldo -= this.haber;
    saldo -= this.debe;
    this._cajaMejorServices.guardarMovimiento(this.cajaActiva.key, movimiento, saldo).then((response)=>{
      this.concepto="";
      this.haber=0;
    }).catch(function(error){
      console.error(error);
    });
    this.listarMovimientos();
  }


  modalActualizarMovimineto(contentEdit, movimiento){
    this.movimientoEditar = movimiento;
    this.modalService.open(contentEdit, {size: 'sm' as 'sm'}).result.then((result) => {
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ActualizarMovimiento(){
    var saldo = this.saldoTotal;
    saldo -= this.movimientoEditar.haber;
    saldo -= this.movimientoEditar.debe;
    this._cajaMejorServices.actualizarMovimiento(this.cajaActiva.key, this.movimientoEditar, saldo).then((response)=>{
      this.listarMovimientos();    
      this.successUpdate="Se actualizo exitosamente!!"
    }).catch(function(error){
      this.errorUpdate="Upsss... algo a salido mal, intentalo mas tarde!!";
      console.error(error);
    });
  }

  private getDismissReason(reason: any): string {
    this.successUpdate = "";
    this.errorUpdate = "";
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
