import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from "lodash";

//SERVICES
import { SemestresService } from "../../services/semestres.service";

@Component({
  selector: 'app-panel-configuracion-semestre',
  templateUrl: './panel-configuracion-semestre.component.html',
  styleUrls: ['./panel-configuracion-semestre.component.css']
})
export class PanelConfiguracionSemestreComponent implements OnInit {

  ListaSemestres:Array<any>;
  forma:FormGroup;
  semestre:any;
  registro:Boolean;


  constructor(
    private modalService: NgbModal,
    private _semestreServices:SemestresService
  ) { 
    this.forma = new FormGroup({
      'cupoSalaCula': new FormControl('', [Validators.required]),
      'cuposCaminadores': new FormControl('', [Validators.required]),
      'cuposParvulo': new FormControl('', [Validators.required]),
      'cuposPreJardin': new FormControl('', [Validators.required]),
      'cuposJardin': new FormControl('', [Validators.required]),
      'cuposTrancision': new FormControl('', [Validators.required]),
      'cuposPrimero': new FormControl('', [Validators.required]),
      'cuposSegundo': new FormControl('', [Validators.required]),
      'cuposTercero': new FormControl('', [Validators.required]),
      'cuposCuarto': new FormControl('', [Validators.required]),
      'cuposQuinto': new FormControl('', [Validators.required]),
      'cerrado': new FormControl(false)
    });
    this.listarSemestes();
  }

  ngOnInit() {
  }

  listarSemestes(){
    this._semestreServices.obtenerSemestres().then(data=>{
      this.ListaSemestres = [];
      _.forEach(data, (anos, index)=>{
          anos = _.map(anos);
        _.forEach(anos, (semestre, index2)=>{
          if(semestre){
            this.ListaSemestres.push(semestre);
          }
        })
      });
    }).catch(error=>{
      console.error("error obteniendo listado de semestres");
      console.error(error);
    })
  }

  modalAbrirSemestrer(content){
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
    }, (reason) => {
    });
  }

  modalCerrarSemestrer(content){
    this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
    }, (reason) => {
    });
  }


  registrarSemestre(){
    let ultimoAno, dataSemestre, numSemestresUltimoAno;
    this._semestreServices.obtenerUltimoAno().then((semestre)=>{
      dataSemestre = semestre;
      this.forma.value.alumnNoAdmidos = {value: 0};                            
      if(semestre){                               //Preguntando si existe un semestre creado
        let keysAnosSemestre = Object.keys(semestre);       //Años 
        ultimoAno = keysAnosSemestre.pop();              //Ultimo año
        let keysSemestre = Object.keys(semestre[ultimoAno]);
        numSemestresUltimoAno = keysSemestre.length; 
        return this._semestreServices.crearSemestre(numSemestresUltimoAno+1, this.forma.value);       //Si existe
      }else{
        return this._semestreServices.crearSemestre(1, this.forma.value );       //Si existe
      }
      }).then((response1)=>{       
        if(dataSemestre){
          var ultimoS=dataSemestre[ultimoAno][numSemestresUltimoAno];
          ultimoS.cerrado=true;
          ultimoS.alumnNoAdmitidos ={value:Number(ultimoS.alumnInscritos.value)-Number(ultimoS.alumnAdmitidos.value)};
          return this._semestreServices.cerrarSemestre(numSemestresUltimoAno, ultimoAno, ultimoS);
        }else{
          return;
        }
      }).then((response2)=>{
        this.listarSemestes();
        this.forma.reset();
        this.registro = true;
        console.log("respuesta de cerrar semestre");
        console.log(response2);
      }).catch((error=>{
        console.log(error);
      }));
  }

  modalDetalleSemestre(content, semestre){
    this.semestre=semestre;
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
    }, (reason) => {
    });
  }


}
