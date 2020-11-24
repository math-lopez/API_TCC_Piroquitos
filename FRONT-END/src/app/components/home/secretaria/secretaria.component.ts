import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
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
  subscription: Subscription[] = [];

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
      funcRA: [null, [Validators.required]],
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
    this.subscription.push(
      this.secServ
        .cadUser({
          login: this.cadAluno.value.login,
          senha: this.cadAluno.value.password,
          tipo: this.cadAluno.value.tipo,
        })
        .subscribe(
          (resp) => {
            if (this.cadAluno.value.tipo === 'aluno') {
              this.cadastrarAluno();
            } else {
              this.cadastrarFunc();
            }
          },
          (error) => {
            this._snackBar.open('Erro ao salvar o usuário', 'fechar', {
              duration: 4000,
              horizontalPosition: this.horizontal,
              verticalPosition: this.vertical,
            });
          }
        )
    );
  }

  cadastrarAluno() {
    this.subscription.push(
      this.secServ
        .cadAluno({
          nome: this.cadAluno.value.nome,
          ra: this.cadAluno.value.funcRA,
          login_FK: this.cadAluno.value.login,
        })
        .subscribe((resp) => {
          this._snackBar.open('Usuário criado com sucesso', 'fechar', {
            duration: 4000,
            horizontalPosition: this.horizontal,
            verticalPosition: this.vertical,
          });
          this.clearForm();
        })
    );
  }

  cadastrarFunc() {
    this.subscription.push(
      this.secServ
        .cadFunc({
          nome: this.cadAluno.value.nome,
          funcional: this.cadAluno.value.funcRA,
          login_FK: this.cadAluno.value.login,
        })
        .subscribe((resp) => {
          this.tookPhoto = true;
          this._snackBar.open('Usuário criado com sucesso', 'fechar', {
            duration: 4000,
            horizontalPosition: this.horizontal,
            verticalPosition: this.vertical,
          });
          this.clearForm();
        })
    );
  }

  clearForm() {
    this.cadAluno.markAsPristine();
    this.cadAluno.markAsUntouched();
    this.cadAluno.updateValueAndValidity();
    this.cadAluno.reset();
  }

  changeTipo(event) {
    if (event === 'aluno') this.tookPhoto = true;
    else this.tookPhoto = false;
  }

  capturePhoto() {
    this.idPhoto++;
    this.subscription.push(
      this.secServ.savePhoto(this.cadAluno.value.funcRA).subscribe((resp) => {
        this.tookPhoto = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => e.unsubscribe());
  }
}
