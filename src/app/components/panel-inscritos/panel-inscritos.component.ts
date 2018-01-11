import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";
import { Observable} from "rxjs/Observable";

@Component({
  selector: 'app-panel-inscritos',
  templateUrl: './panel-inscritos.component.html',
  styleUrls: ['./panel-inscritos.component.css']
})
export class PanelInscritosComponent implements OnInit {

  errorConsulta:String;
  exitoConsulta:String;

  inscritos:Promise<any>;


  constructor(
    private _auth: AutenticacionService, 
    private _inscripcionesService:InscripcionesService,
    private router: Router
    ) { 

    //Validando si el usuario tiene una sesion iniciada, si la tiene se redirige a panel
    if(!this._auth.currentUser){
      this.router.navigate(['/login']);
    }   
    
    this.listarInscritos();
    
  }

  ngOnInit() {
  }

  listarInscritos(){
    this.inscritos = this._inscripcionesService.listarInscritos();
  }

}
