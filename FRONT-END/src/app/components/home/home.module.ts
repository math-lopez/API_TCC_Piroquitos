import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//imports Material Design
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

// my imports Modules
import { HomeRoutingModule } from './home-routing.module';

//my imports Components
import { HomeComponent } from './home/home.component';
import { ProfComponent } from './prof/prof.component';
import { AddAulaComponent } from './prof/add-aula/add-aula.component';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { EditUserComponent } from './secretaria/edit-user/edit-user.component';
import { EditPresencaComponent } from './prof/edit-presenca/edit-presenca.component';
import { ShowAlunosComponent } from './secretaria/edit-user/show-alunos/show-alunos.component';
import { DialogConfirmMudancaPresencaComponent } from './prof/dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';



@NgModule({
  declarations: [
    HomeComponent, 
    SecretariaComponent, 
    EditUserComponent, 
    ShowAlunosComponent, 
    ProfComponent, 
    EditPresencaComponent, 
    AddAulaComponent, 
    DialogConfirmMudancaPresencaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
