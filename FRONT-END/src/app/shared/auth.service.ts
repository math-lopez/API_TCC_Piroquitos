import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  aulas: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  isAuth: BehaviorSubject<any> = new BehaviorSubject(false);
  dadosTipoUsuario: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  authUser(user: User){
    return this.http.post<User>(`${environment.API_URL}usuarios/validate`, user)
    .pipe(
      map(result => {
        this.usuario.next(result);
        if(result.tipo == 'aluno'){
          this.http.post(`${environment.API_URL}alunos/searchByLogin`,{login_FK: result.login}).subscribe(res => {
            this.dadosTipoUsuario.next(res)
          })
        }else{
          this.http.post(`${environment.API_URL}funcionarios/searchByLogin`,{login_FK: result.login}).subscribe(res => {
            this.dadosTipoUsuario.next(res)
          })
        }
        return result;
      }));
  }
}
