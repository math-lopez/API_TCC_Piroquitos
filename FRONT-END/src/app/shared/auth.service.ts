import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: BehaviorSubject<any> = new BehaviorSubject<any>({});
  users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  aulas: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  isAuth: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor() {
    this.usuario.next({
      nome: 'Matheus Lopes de Jesus',
      login: 'N123456',
      tipo: 'secretaria',
      password: '123',
      presenca: false
    });
    this.users.next([
      {
        nome: 'Matheus Lopes de Jesus',
        login: 'N123456',
        tipo: 'secretaria',
        password: '123',
        presenca: true
      },
      {
        nome: 'Gabriel Soares Araujo',
        login: 'N1234C0',
        tipo: 'aluno',
        password: '123456',
        presenca: true
      },
      {
        nome: 'Matheus Lopes de Jesus',
        login: 'N123456',
        tipo: 'secretaria',
        password: '123',
        presenca: false
      },
      {
        nome: 'Gabriel Soares Araujo',
        login: 'N1234C0',
        tipo: 'aluno',
        password: '123456',
        presenca: true
      },
      {
        nome: 'Matheus Lopes de Jesus',
        login: 'N123456',
        tipo: 'secretaria',
        password: '123',
        presenca: false
      },
      {
        nome: 'Gabriel Soares Araujo',
        login: 'N1234C0',
        tipo: 'aluno',
        password: '123456',
        presenca: false
      }
    ]);
    this.aulas.next([
      {
        aula: 'TCC 1',
        qtdAlunos: 6,
        dataAula: new Date(2020,10,22, 19, 10)
      },
      {
        aula: 'TCC 2',
        qtdAlunos: 6,
        dataAula: new Date(2020, 10, 21, 19, 10)
      },
      {
        aula: 'Estrutura de Dados',
        qtdAlunos: 6,
        dataAula: new Date(2020, 10, 20, 19, 10)
      }
    ])
  }
}
