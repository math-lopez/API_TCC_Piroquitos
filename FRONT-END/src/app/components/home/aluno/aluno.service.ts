import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor() { }

  getAulas(loginAluno){
    console.log(loginAluno);
  }
}
