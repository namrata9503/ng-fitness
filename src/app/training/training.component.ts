import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/Subscription';

import * as fromTraining from './training.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining$ : Observable<boolean>;
  exerciseSubscription: Subscription;

  constructor(private trainingService : TrainingService,
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit() {
            // without NgRx

    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
    //   exercise => {
    //     if(exercise){
    //     this.onGoingTraining = true;
    //     }else{
    //       this.onGoingTraining = false;
    //     }
    //   });

    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);

  }

  // ngOnDestroy(){
  //   if(this.exerciseSubscription){
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }
 

}
