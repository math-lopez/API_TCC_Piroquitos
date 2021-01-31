import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoComponent } from './aluno/aluno.component';
import { AulasComponent } from './aluno/aulas/aulas.component';
import { HomeComponent } from './home/home.component';
import { ProfComponent } from './prof/prof.component';
import { ShowAlunosComponent } from './secretaria/edit-user/show-alunos/show-alunos.component';
import { GerenciarAulasComponent } from './secretaria/gerenciar-aulas/gerenciar-aulas.component';
import { SalasComponent } from './secretaria/salas/salas.component';
import { SecretariaComponent } from './secretaria/secretaria.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sec', component: SecretariaComponent, pathMatch: 'full' },
  { path: 'editAluno', component: ShowAlunosComponent, pathMatch: 'full' },
  { path: 'salas', component: SalasComponent, pathMatch: 'full' },
  { path: 'prof', component: ProfComponent, pathMatch:'full' },
  { path: 'aluno', component: AlunoComponent, pathMatch:'full' },
  { path: 'aulas', component: GerenciarAulasComponent, pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
