import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AngularFirestoreModule } from 'angularfire2/firestore'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { FormsModule } from '@angular/forms';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';

import { trainingReducer } from './training.reducer';


@NgModule({
  declarations: [
    TrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    StoreModule.forFeature('training', trainingReducer)

  ],
  entryComponents:[StopTrainingComponent]

})
export class TrainingModule { }
