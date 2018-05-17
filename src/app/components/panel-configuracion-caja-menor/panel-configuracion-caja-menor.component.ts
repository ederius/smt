import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

//services
import { AutenticacionService } from "../../services/autenticacion.service";


@Component({
  selector: 'app-panel-configuracion-caja-menor',
  templateUrl: './panel-configuracion-caja-menor.component.html',
  styleUrls: ['./panel-configuracion-caja-menor.component.css']
})
export class PanelConfiguracionCajaMenorComponent implements OnInit {

  constructor(
    private _auth: AutenticacionService, 
    private router: Router,
  ) { 

  }

  ngOnInit() {
  }

}
