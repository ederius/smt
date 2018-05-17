import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-panel-inicio',
  templateUrl: './panel-inicio.component.html',
  styleUrls: ['./panel-inicio.component.css']
})
export class PanelInicioComponent implements OnInit {

  constructor(public _authService:AutenticacionService, public router:Router) {

   }

  ngOnInit() {
  }

}
