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
  idPhoto = 0;

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
      nome: [null, [Validators.required]],
    });
  }

  submit() {
    if (this.cadAluno.valid) {
      this.cadUser();
    } else {
      this._snackBar.open('Obrigatório preencher todos os campos.', 'fechar', {
        duration: 2000,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical,
      });
    }
  }

  cadUser() {
    this.secServ
      .cadUser({
        login: this.cadAluno.value.login,
        senha: this.cadAluno.value.password,
        tipo: this.cadAluno.value.tipo,
      })
      .subscribe((resp) => {
        this.tookPhoto = true;
        this.clearForm();
      });
  }

  clearForm() {
    this.cadAluno.markAsPristine();
    this.cadAluno.markAsUntouched();
    this.cadAluno.updateValueAndValidity();
    this.cadAluno.reset();
  }

  capturePhoto() {
    this.idPhoto++;
    this.secServ
      .savePhoto(this.cadAluno.value.login, this.idPhoto.toString())
      .subscribe((resp) => {
        console.log(resp);
        this.tookPhoto = false;
      });
  }
}
