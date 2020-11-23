import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(private http: HttpClient) { }

  getProf(login){
    return this.http.post(`${environment.API_URL}funcionarios/searchByLogin`, {login_FK: login});
  }
  getAulas(prof){
    console.log(prof)
    return this.http.post<any[]>(`${environment.API_URL}aulas/searchByIdProf`, {profid_FK: prof.funcionarioId});
  }
}
