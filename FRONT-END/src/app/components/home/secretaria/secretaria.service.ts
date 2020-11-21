import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  constructor(private http: HttpClient) { }

  cadUser(user){
    console.log(user)
  }

}
