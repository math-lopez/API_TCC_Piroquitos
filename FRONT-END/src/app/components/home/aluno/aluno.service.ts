import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  getAulas(alunoId){
    return this.http.post<any>(`${environment.API_URL}custom/aulasPorAluno/`, {alunoId: alunoId})
  }

  getAluno(login){
    return this.http.post<any>(`${environment.API_URL}alunos/searchByLogin`, login)
  }
}
