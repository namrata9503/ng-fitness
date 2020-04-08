import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

import { AuthGuard } from './auth/auth.guard';
import { TrainingRoutingModule } from './training/training-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent  },

 // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  TrainingRoutingModule,
  AuthRoutingModule
  ],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
