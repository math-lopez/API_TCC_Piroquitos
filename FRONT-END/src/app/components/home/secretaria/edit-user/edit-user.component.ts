import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';
import { SecretariaService } from '../secretaria.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user: any;
  @Output() back = new EventEmitter<boolean>();
  hide: boolean = false;
  cadAluno: FormGroup;
  tookPhoto: boolean;
  private horizontal: MatSnackBarHorizontalPosition = 'center';
  private vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private formBuilder: FormBuilder,
    private secServ: SecretariaService,
    private _snackBar: MatSnackBar,
    private authServ: AuthService) { }

  ngOnInit(): void {
    this.cadAluno = this.formBuilder.group({
      login: [{value: this.user.login != undefined ? this.user.login : null, disabled: true}, [Validators.required]],
      senha: [this.user.senha != undefined ? this.user.senha : null, [Validators.required]],
      tipo: [this.user.tipo, [Validators.required]],
      nome: [this.user.nome, [Validators.required]]
    });
    console.log(this.cadAluno)
  }

  submit(){
    console.log(this.cadAluno);

    if(this.cadAluno.valid){
      this.authServ.usuario.subscribe(resp => {
        this.secServ.updateUser({
          login: resp.login,
          senha: this.cadAluno.controls.senha.value,
          tipo: this.cadAluno.controls.tipo.value
        }).subscribe(resp => {
          console.log(resp)
        });
        this.back.emit(false);
      });
    }else{
      console.log(this.cadAluno)
      this._snackBar.open('Obrigatório preencher todos os campos.', 'fechar', {
        duration: 2000,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical
      });
    }
  }
  clearForm(){
    this.cadAluno.markAsPristine();
    this.cadAluno.markAsUntouched();
    this.cadAluno.updateValueAndValidity();
    this.cadAluno.reset();
  }
  capturePhoto(){
    console.log('Capture Photo');
    this.tookPhoto = false;
  }
}
