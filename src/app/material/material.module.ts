import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
  MatSidenavModule, MatToolbarModule, MatListModule , MatTabsModule  , MatCardModule, MatSelectModule , MatProgressSpinnerModule, MatDialogModule,
  MatTableModule, MatSortModule, MatPaginatorModule , MatSnackBarModule
} from '@angular/material';
//import { MatInput } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatCheckboxModule, MatSidenavModule , MatToolbarModule ,MatIconModule, MatListModule , MatTabsModule , 
    MatCardModule, MatSelectModule , MatProgressSpinnerModule, MatDialogModule , MatTableModule , MatSortModule , MatPaginatorModule ,
    MatSnackBarModule

  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatCheckboxModule, MatSidenavModule , MatToolbarModule ,MatIconModule, MatListModule , MatTabsModule , 
    MatCardModule, MatSelectModule , MatProgressSpinnerModule, MatDialogModule , MatTableModule , MatSortModule , MatPaginatorModule ,
    MatSnackBarModule

  ]
})
export class MaterialModule { }
