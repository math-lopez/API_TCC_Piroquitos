import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(private http: HttpClient) { }

  getProf(login){
    return this.http.post<any>(`${environment.API_URL}funcionarios/searchByLogin`, {login_FK: login});
  }

  getAlunosPorAula(profId, aulaId){
    return this.http.post<any[]>(`${environment.API_URL}custom/alunosPorAula`, {
      profId_FK: profId,
      aulaId: aulaId});
  }

  getSalas(){
    return this.http.post<any[]>(`${environment.API_URL}salas/list`, {});
  }

  getAlunos(){
    return this.http.post<any[]>(`${environment.API_URL}alunos/list`, {});
  }

  getAulas(prof){
    return this.http.post<any[]>(`${environment.API_URL}aulas/searchByIdProf`, {profId_FK: prof.funcionarioId});
  }

  addAula(aula){
    return this.http.post<any>(`${environment.API_URL}aulas/add`, aula);
  }

  addAluno(presenca){
    return this.http.post(`${environment.API_URL}presenca/add`, presenca);
  }

  updateAula(aula){
    return this.http.post<any>(`${environment.API_URL}aulas/update`, aula);
  }

  deleteAula(aulaId){
    return this.http.post(`${environment.API_URL}aulas/removeById`, {aulaId: aulaId});
  }

  removeAlunoAula(alunoId_FK, aulaId_FK){
    return this.http.post(`${environment.API_URL}presenca/remove`, {alunoId_FK: alunoId_FK, aulaId_FK: aulaId_FK});
  }

  iniciarAula(idAula){
    return this.http.get(`${environment.API_URL}esp/setPresenca?aulaId=${idAula}`);
  }

  updatePresenca(presenca){
    return this.http.post(`${environment.API_URL}presenca/update`, presenca);
  }
}
