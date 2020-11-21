import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditUserComponent } from './secretaria/edit-user/edit-user.component';
import { RouterModule } from '@angular/router';
import { ShowAlunosComponent } from './secretaria/edit-user/show-alunos/show-alunos.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProfComponent } from './prof/prof.component';
import { EditPresencaComponent } from './prof/edit-presenca/edit-presenca.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddAulaComponent } from './prof/add-aula/add-aula.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogConfirmMudancaPresencaComponent } from './prof/dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [HomeComponent, SecretariaComponent, EditUserComponent, ShowAlunosComponent, ProfComponent, EditPresencaComponent, AddAulaComponent, DialogConfirmMudancaPresencaComponent],
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
    HomeComponent, SecretariaComponent, EditUserComponent
  ]
})
export class HomeModule { }
