import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';


@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  displayedColumns = ['date', 'name', 'calories', 'duraion', 'state'];

  dataSource = new MatTableDataSource<Exercise>();
  pastExeciseSubscription: Subscription;

  constructor(private trainingService: TrainingService, private store : Store<fromTraining.State>) { }

  ngOnInit() {
    // this.pastExeciseSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
    //   this.dataSource.data = exercises;
    // })
     this.store.select(fromTraining.getFinishedExercises).subscribe(
       (exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    })
    this.trainingService.fetchCompletOrCancelledExrecise();

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  doFilter(filterVal: string) {
    this.dataSource.filter = filterVal.trim().toLowerCase();
  }
  // ngOnDestroy() {
  //   if(this.pastExeciseSubscription){
  //     this.pastExeciseSubscription.unsubscribe();

  //   }

  // }

}
