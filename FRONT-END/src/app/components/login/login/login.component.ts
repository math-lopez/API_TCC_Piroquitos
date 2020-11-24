import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userIncorreto: boolean = false;
  hide: boolean = true;
  user = new FormControl(null, [Validators.required]);
  password = new FormControl(null, [Validators.required]);

  constructor(private router: Router, private authServ: AuthService) {}

  ngOnInit(): void {}

  auth() {
    if(this.user.valid && this.password.valid){
      this.authServ
      .authUser({
        login: this.user.value,
        senha: this.password.value,
        tipo: null,
      })
      .subscribe((resp) => {
        if (resp.tipo == 'secre') this.router.navigate(['home/sec']);
        else if (resp.tipo == 'profe') this.router.navigate(['home/prof']);
        else if (resp.tipo == 'aluno') this.router.navigate(['home/aluno']);
        this.authServ.isAuth.next(true);
        this.userIncorreto = false;
      },
      error => {
        if(error.status === 403){
          this.userIncorreto = true;
        }
      });
    }
  }
}
