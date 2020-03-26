import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
   // authChange = new Subject<boolean>();
    // private user: User;
    private isAuthenticated = false;

    constructor(private router: Router,
        private newAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {

    }
    initAuthListener() {
        this.newAuth.authState.subscribe(user => {
            if (user) {
               // this.isAuthenticated = true;
               // this.authChange.next(true);

               this.store.dispatch(new Auth.SetAuthenticated())
                this.router.navigate(['/training']);
            }
            else {

                this.trainingService.cancelSubcription();
               // this.authChange.next(false);
               this.store.dispatch(new Auth.SetUnAuthenticated())

                this.router.navigate(['/login']);
              //  this.isAuthenticated = false;
            }
        })
    }

    registerUser(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // }
        /*loading ui change without NgRx */
        // this.uiService.loadingStateChanged.next(true);


        this.store.dispatch(new UI.StartLoading());
        this.newAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                // this.authSuccess();
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());

            })
            .catch(error => {
                //  console.log(error);
                // this.uiService.loadingStateChanged.next(false);

                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
            });

    }

    login(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()

        // }
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());

        this.newAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                // this.uiService.loadingStateChanged.next(false);

                //this.authSuccess();
                this.store.dispatch(new UI.StopLoading());

            })
            .catch(error => {
                // console.log(error);
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());

                this.uiService.showSnackbar(error.message, null, 3000);

            });
    }
    logout() {
        // this.user = null;
        this.newAuth.auth.signOut();
    }

    // getUser() {
    //     return { ...this.user };
    // }
    // isAuth() {
    //     // return this.user !==  null;
    //     return this.isAuthenticated;
    // }

    // authSuccess() {
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.router.navigate(['/training']);
    // }
}

