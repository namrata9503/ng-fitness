import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.guard';

const routes : Routes = [
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class TrainingRoutingModule { }
