import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { take } from 'rxjs/operators';


import * as fromRoot from '../app.reducer';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // exerciseChanged = new Subject<Exercise>();
  // exercisesChanged = new Subject<Exercise[]>();
  // finishedExercisesChanged = new Subject<Exercise[]>();

  private fireSubscription: Subscription[] = [];

  //  private availableExrecises: Exercise[] = [];

  // private runningExercises: Exercise;
  // private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService,
    private store: Store<fromTraining.State>) { }

  fetchAvailableExercises() {
    // return this.availableExrecises.slice();
    this.store.dispatch(new UI.StartLoading())
    this.fireSubscription.push(this.db.collection('availableExrecises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          //throw Error();
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      })
      .subscribe((exercise: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercise));
        // this.availableExrecises = exercise;
        // this.exercisesChanged.next([...this.availableExrecises]);


      }, error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());

        this.uiService.showSnackbar('Fetching Exercises failed.. Please try again later..', null, 3000);
        // this.exercisesChanged.next(null);

      }));
  }

  startExercise(selectedId: string) {
    // this.runningExercises = this.availableExrecises.find(ex => ex.id === selectedId);
    // this.
    //   exerciseChanged.next({ ...this.runningExercises })

    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExrecise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'çompleted'
      });
      // this.runningExercises = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new Training.StopTraining());
    });

  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      // this.runningExercises = null;
      // this.exerciseChanged.next(null);

      this.store.dispatch(new Training.StopTraining());
    });

  }
  // getRunningExercise() {
  //   return { ...this.runningExercises };
  // }

  fetchCompletOrCancelledExrecise() {
    this.fireSubscription.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe(
        (exercises: Exercise[]) => {
          // this.finishedExercisesChanged.next(exercises);

          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        }));

  }

  cancelSubcription() {
    this.fireSubscription.forEach(sub => sub.unsubscribe());
  }
  addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);

  }
}
