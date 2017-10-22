import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit{

  constructor(private _auht:AutenticacionService, private router:Router) {

    if(!this._auht.currentUser){
      this.router.navigate(['/login']);
    }  

   }

  ngOnInit() {
  }



}
