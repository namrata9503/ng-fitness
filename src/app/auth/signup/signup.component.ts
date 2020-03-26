import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription, Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  //isLoading = false;
  isLoading$: Observable<boolean>;
  private loadingSubscription: Subscription;
  constructor(private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    // this.loadingSubscription =  this.uiService.loadingStateChanged.subscribe(isLoading =>{
    //   this.isLoading = isLoading;
    // });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
  // ngOnDestroy(){
  //   if(this.loadingSubscription){
  //     this.loadingSubscription.unsubscribe();

  //   }
  // }
}
