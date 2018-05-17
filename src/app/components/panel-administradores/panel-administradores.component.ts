import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

//services
import { AutenticacionService } from "../../services/autenticacion.service";


@Component({
  selector: 'app-panel-administradores',
  templateUrl: './panel-administradores.component.html',
  styleUrls: ['./panel-administradores.component.css']
})
export class PanelAdministradoresComponent implements OnInit {

  constructor(
    private _auth: AutenticacionService,
    private router: Router
  ) {
   }

  ngOnInit() {
  }

}
