import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router } from "@angular/router";
import { log } from 'util';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit{

  rollUsuario:Number;

  constructor(private _auht:AutenticacionService, private router:Router) {
   }

  ngOnInit() {
  }



}
