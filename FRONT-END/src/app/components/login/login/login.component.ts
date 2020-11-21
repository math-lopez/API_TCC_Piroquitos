import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  user = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required])

  
  constructor(private router: Router, private authServ: AuthService) { }

  ngOnInit(): void {
  }

  auth(){
    this.authServ.usuario.subscribe(resp => {
      console.log(resp)
      if(resp.tipo == 'secretaria')
        this.router.navigate(['home/sec']);
      else if(resp.tipo == 'professor')
        this.router.navigate(['home/prof']);
      else if(resp.tipo == 'aluno')
        this.router.navigate(['home/aluno'])
    });

    this.authServ.isAuth.next(true);
  }
}
