import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecretariaService {
  constructor(private http: HttpClient) {}


  getSalas(){
    return this.http.post<any[]>(`${environment.API_URL}salas/list`, {});
  }

  getAllFunc(){
    return this.http.post<any[]>(`${environment.API_URL}custom/dadosFuncs`, {});
  }

  getAllAlunos(){
    return this.http.post<any[]>(`${environment.API_URL}custom/dadosAlunos`, {});
  }

  cadSala(sala){
    return this.http.post(`${environment.API_URL}salas/add`, sala);
  }

  cadUser(user) {
    return this.http.post(`${environment.API_URL}usuarios/add`, user);
  }

  cadAluno(aluno){
    return this.http.post(`${environment.API_URL}alunos/add`, aluno);
  }

  cadFunc(func){
    return this.http.post(`${environment.API_URL}funcionarios/add`, func);
  }

  updateUser(user) {
    return this.http.post(`${environment.API_URL}usuarios/update`, user);
  }

  updateSala(sala){
    return this.http.post(`${environment.API_URL}salas/update`, sala);
  }

  removeUser(user){
    return this.http.post(`${environment.API_URL}usuarios/remove`, user);
  }

  removeFunc(funcId){
    return this.http.post(`${environment.API_URL}funcionarios/removeById`, {funcionarioId: funcId});
  }

  removeAluno(alunoId){
    return this.http.post(`${environment.API_URL}alunos/removeById`, {alunoId: alunoId});
  }

  removeSala(salaId){
    return this.http.post(`${environment.API_URL}salas/remove`, {salaId: salaId})
  }

  savePhoto(ra){
    return this.http.get(`${environment.API_URL}esp/cadastro?ra=${ra}`);
  }
}
