import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { error } from 'protractor';
import { AuthService } from 'src/app/shared/auth.service';
import { SecretariaService } from '../secretaria.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  private horizontal: MatSnackBarHorizontalPosition = 'center';
  private vertical: MatSnackBarVerticalPosition = 'bottom';

  @Input() user: any;
  @Output() back = new EventEmitter<boolean>();

  hide: boolean = false;
  cadAluno: FormGroup;
  tookPhoto: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private secServ: SecretariaService,
    private _snackBar: MatSnackBar,
    private authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.cadAluno = this.formBuilder.group({
      login: [
        {
          value: this.user.login != undefined ? this.user.login : null,
          disabled: true,
        },
        [Validators.required],
      ],
      senha: [null],
      tipo: [this.user.tipo, [Validators.required]],
      nome: [this.user.nome, [Validators.required]],
    });
  }

  submit() {
    if (this.cadAluno.valid) {
      this.secServ
        .updateUser({
          login: this.user.login,
          senha: this.cadAluno.value.senha,
          tipo: this.cadAluno.value.tipo,
        })
        .subscribe((resp) => {
          this._snackBar.open('Usuário alterado com sucesso', 'fechar', {
            duration: 4000,
            horizontalPosition: this.horizontal,
            verticalPosition: this.vertical,
          });
        }, error => {
          this._snackBar.open('Erro ao alterar usuário', 'fechar', {
            duration: 4000,
            horizontalPosition: this.horizontal,
            verticalPosition: this.vertical,
          });
        });
    } else {
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
}
