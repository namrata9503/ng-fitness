import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  
  @Output() stopTraining = new EventEmitter();
  progress = 0;
  timer: number;
  constructor(private dialog: MatDialog,
    private router:Router,
    private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

 

  ngOnInit() {
    this.startOrResumeTraining();
  }
  startOrResumeTraining() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = window.setInterval(() => {

        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExrecise();
          clearInterval(this.timer);
        }
      }, step);
    });


  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        // this.stopTraining.emit();
        this.trainingService.cancelExercise(this.progress);
      }
      else {
        this.startOrResumeTraining();
      }
    })

  }

  gotoHome(){
    this.router.navigate(['']);  // define your component where you want to go
}

}
