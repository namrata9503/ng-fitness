import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  authSubcription: Subscription;
 // isAuth = false;
 isAuth$ : Observable<boolean>;

  constructor(private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubcription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus
    // });
   this.isAuth$= this.store.select(fromRoot.getIsAuth);
  }
  onClose() {
    this.closeSidenav.emit();
  }
  onLogout(){
    this.onClose();
    this.authService.logout();
  }
  // ngOnDestroy() {
  //   this.authSubcription.unsubscribe();
  // }
}
