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
    this.router.navigate(['home/prof']);
    this.authServ.isAuth.next(true);
  }
}
