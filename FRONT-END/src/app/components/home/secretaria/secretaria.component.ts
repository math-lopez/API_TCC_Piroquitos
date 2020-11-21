import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SecretariaService } from './secretaria.service';

@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.scss'],
})
export class SecretariaComponent implements OnInit {
  
  private horizontal: MatSnackBarHorizontalPosition = 'center';
  private vertical: MatSnackBarVerticalPosition = 'bottom';
  
  tookPhoto: boolean = true;
  cadAluno: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private secServ: SecretariaService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {

    this.cadAluno = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      nomeRA: [null, [Validators.required]],
    });
  }

  submit() {

    if (this.cadAluno.valid) {
      console.log(this.cadAluno);
      this.secServ.cadUser(this.cadAluno.value);
      this.tookPhoto = true;
      this.clearForm();
    } 
    else {
      console.log(this.cadAluno);
      this._snackBar.open('Obrigatório preencher todos os campos.', 'fechar', {
        duration: 2000,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical,
      });
    }
  }

  clearForm() {

    this.cadAluno.markAsPristine();
    this.cadAluno.markAsUntouched();
    this.cadAluno.updateValueAndValidity();
    this.cadAluno.reset();
  }

  capturePhoto() {
    
    this.tookPhoto = false;
  }
}
