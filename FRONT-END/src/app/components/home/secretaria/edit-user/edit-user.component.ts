import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SecretariaService } from '../secretaria.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user: any;
  @Output() back = new EventEmitter<boolean>();
  hide: boolean = true;
  cadAluno: FormGroup;
  tookPhoto: boolean;
  private horizontal: MatSnackBarHorizontalPosition = 'center';
  private vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private formBuilder: FormBuilder,
    private secServ: SecretariaService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cadAluno = this.formBuilder.group({
      login: [{value: this.user.login != undefined ? this.user.login : null, disabled: true}, [Validators.required]],
      password: [{value: this.user.password != undefined ? this.user.password : null, disabled: true}, [Validators.required]],
      tipo: [this.user.tipo, [Validators.required]],
      nomeRA: [this.user.nome, [Validators.required]]
    });
    console.log(this.cadAluno)
  }

  submit(){
    console.log(this.cadAluno)
    if(this.cadAluno.valid){
      console.log(this.cadAluno)
      this.secServ.cadUser(this.cadAluno.value);
      this.clearForm();
    }else{
      console.log(this.cadAluno)
      this._snackBar.open('Obrigatório preencher todos os campos.', 'fechar', {
        duration: 2000,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical
      })
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
