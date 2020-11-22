import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecretariaService {
  constructor(private http: HttpClient) {}

  cadUser(user) {
    console.log(user);
    return this.http.post(`${environment.API_URL}usuarios/add`, user);
  }

  cadAluno(aluno){
    console.log(aluno);
    return this.http.post(`${environment.API_URL}alunos/add`, aluno);
  }

  updateUser(user) {
    console.log(user);
    return this.http.post(`${environment.API_URL}usuarios/update`, user);
  }

  removeUser(user){
    console.log(user);
    return this.http.post(`${environment.API_URL}usuarios/remove`, user);
  }

  savePhoto(ra, idPhoto){
    console.log(idPhoto)
    return this.http.get(`${environment.API_URL}?ra=${ra}&idPhoto=${idPhoto}`)
  }
}
