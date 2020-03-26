import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


openSidenav: false;

constructor(private authService: AuthService){ }
onToggle(){

}

ngOnInit(){
this.authService.initAuthListener();
}

}
