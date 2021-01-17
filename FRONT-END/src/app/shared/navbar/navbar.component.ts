import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario: any;
  dadosTipoUsuario: any = {};
  auth: boolean = false
  subscription: Subscription[] = [];
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isAuth.subscribe(resp => { this.auth = resp }),
      this.authService.usuario.subscribe(resp => { this.usuario = resp; }),
      this.authService.dadosTipoUsuario.subscribe(resp => { this.dadosTipoUsuario = resp})
    );
  }

  logout(){
    this.router.navigate([''])
    this.authService.isAuth.next(false);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => e.unsubscribe())
  }

}
