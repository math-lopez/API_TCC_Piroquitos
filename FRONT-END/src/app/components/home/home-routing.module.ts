import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfComponent } from './prof/prof.component';
import { ShowAlunosComponent } from './secretaria/edit-user/show-alunos/show-alunos.component';
import { SecretariaComponent } from './secretaria/secretaria.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sec', component: SecretariaComponent, pathMatch: 'full' },
  { path: 'editAluno', component: ShowAlunosComponent, pathMatch: 'full' },
  { path: 'prof', component: ProfComponent, pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
