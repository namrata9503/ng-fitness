import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

 // @Output() trainingStart = new EventEmitter<void>();
  // exercises: Exercise[]= [];
  // isLoading = true;
  exercises$: Observable<Exercise[]>;

  isLoading$: Observable<boolean>;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService,    private uiService: UIService,

    private store: Store<fromTraining.State>

  ) { }

  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
    //   exercises => {
    //    // this.isLoading = false;
    //     this.exercises = exercises;
    //   }
    // );
    
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    this.trainingService.startExercise(form.value.exercise);
  }

//   openVideo() {

//     var iframe = document.createElement('iframe');
//     iframe.src = 'http://example.com';
//     document.body.appendChild(iframe);
 
//  };
  // ngOnDestroy() {


  //   if(this.exerciseSubscription){
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }

}
