import { Component, OnInit } from '@angular/core';
import * as moment from "moment-timezone";
import * as _ from "lodash";
moment.locale('es');
moment.tz("America/Los_Angeles");

//SERVICES
import { CajaMenorService } from "../../services/caja-menor.service";

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
  gastos:Array<any>;

  constructor(private _cajaMejorServices:CajaMenorService) { 
    this.listarGastos();
    this.fecha = moment().format('MMMM Do YYYY, h:mm a');      //obteniendo fecha y hora actual  
    this.fechaApertura = moment().format('MMMM Do YYYY, h:mm a');
    this.saldoApertura = 5000000
  }

  ngOnInit() {
  }

  listarGastos(){
    this._cajaMejorServices.obtenerGastos().then((data)=>{
      this.gastos = data;
      this.haber = 0 ;
      var saldoTotal, saldo=0, saldoApertura=this.saldoApertura;
      _.forEach(this.gastos, (o, index)=>{
        saldo += o.gasto;
        this.gastos[index].saldo=saldoApertura-saldo;
        if(data.length-1 == parseInt(index)){
          saldoTotal = saldoApertura - saldo;
          this.saldoTotal = saldoTotal;
        }
      });

    });
  }

  guardarGasto(){
    var gasto = {
      fecha:this.fecha,
      concepto:this.concepto,
      gasto:this.haber
    }
    this._cajaMejorServices.guardarGasto(gasto).then((response)=>{
      console.log(response);
      this.concepto="";
      this.haber=0;
    }).catch(function(error){
      console.error(error);
    });
    this.listarGastos();


  }

}
