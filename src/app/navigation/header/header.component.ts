import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription: Subscription;
 // isAuth = false;
 isAuth$ : Observable<boolean>;



  constructor(private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
   this.isAuth$= this.store.select(fromRoot.getIsAuth);

  }
  onToggleSidenav() {

    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }

}
