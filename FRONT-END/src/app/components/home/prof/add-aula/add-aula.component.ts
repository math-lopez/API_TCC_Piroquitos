import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-aula',
  templateUrl: './add-aula.component.html',
  styleUrls: ['./add-aula.component.scss']
})
export class AddAulaComponent implements OnInit {

  salas: any[] = [1,2,3,4,5,6,7,8,9,10]
  cadAula: FormGroup;
  alunosCadastrados: any;
  constructor(
    public dialogRef: MatDialogRef<AddAulaComponent>, 
    private formBuilder: FormBuilder, 
    private authServ: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
  ngOnInit(): void {
    if(this.data)
      var dataUpdate = new Date(this.data.dataAula);

    this.authServ.users.subscribe(resp => {
      this.alunosCadastrados = resp;
    });

    this.cadAula = this.formBuilder.group({
      aula: [this.data != undefined ? this.data.aula : null, [Validators.required]],
      inicioAula: [this.data != undefined ? (dataUpdate.getFullYear() +'-'+ 
      dataUpdate.getMonth() +'-'+ 
      dataUpdate.getDate() +'T'+ 
      dataUpdate.getHours() +':'+ 
      dataUpdate.getMinutes()) : null, [Validators.required]],
      sala: [this.data?.sala != undefined ? this.data.sala : null, Validators.required],
      alunos: [this.data?.alunos != undefined ? this.data.alunos : null, Validators.required]
    });
  }

  addAula(){
    var teste = this.cadAula.value;
    console.log(teste);
    this.dialogRef.close()
  }

}
