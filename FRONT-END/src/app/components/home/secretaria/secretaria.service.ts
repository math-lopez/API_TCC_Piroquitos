import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  constructor(private http: HttpClient) { }

  cadUser(user){
    console.log(user);
    return this.http.post(`${environment.API_URL}usuarios/add`, user)
  }

  updateUser(user){
    console.log(user)
    return this.http.post(`${environment.API_URL}usuarios/update`, user)
  }

}
