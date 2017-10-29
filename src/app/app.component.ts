import { Component } from '@angular/core';
import * as firebase from "firebase";
//firebase develop
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(){
    firebase.initializeApp(environment.firebase);
  }
}
