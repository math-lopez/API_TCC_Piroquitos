import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';
import { ProfService } from '../prof.service';

@Component({
  selector: 'app-add-aula',
  templateUrl: './add-aula.component.html',
  styleUrls: ['./add-aula.component.scss'],
})
export class AddAulaComponent implements OnInit {
  salas: any[] = [];
  cadAula: FormGroup;
  alunosCadastrados: any[] = [];
  modeEdit: boolean = false;
  fixChar: any = '';
  selectedAlunos = [];

  constructor(
    public dialogRef: MatDialogRef<AddAulaComponent>,
    private formBuilder: FormBuilder,
    private authServ: AuthService,
    private profServ: ProfService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.profServ.getSalas()
    .subscribe(resp => {
      this.salas = resp;
    });

    this.profServ.getAlunos()
    .subscribe(resp => {
      this.alunosCadastrados = resp;
      if(this.data){
        this.alunosCadastrados.forEach(e => {
          this.verificarMatricula(e);
        });
      }
    });

    if (this.data){
      var dataUpdate = new Date(this.data.aula.inicio_Aula);
      this.fixChar = dataUpdate.getDate() <= 9 ? '0' : '';
    }

    this.authServ.users.subscribe((resp) => {
      this.alunosCadastrados = resp;
    });


    this.cadAula = this.formBuilder.group({
      aula: [
        this.data != undefined ? this.data.aula.nome : null,
        [Validators.required],
      ],
      inicioAula: [
        this.data != undefined
          ? dataUpdate.getFullYear() +
            '-' +
            dataUpdate.getMonth() +
            '-' +
            this.fixChar + dataUpdate.getDate() +
            'T' +
            dataUpdate.getHours() +
            ':' +
            dataUpdate.getMinutes()
          : null,
        [Validators.required],
      ],
      sala: [
        this.data?.aula.salaId_FK != undefined ? this.data?.aula.salaId_FK : null,
        Validators.required,
      ],
      alunos: [
        this.data?.alunos != undefined ? this.data?.alunos : null,
        Validators.required,
      ],
    });
  }

  addAula() {
    var aula = this.cadAula.value;
    console.log(this.data);
    this.authServ.usuario.subscribe((resp) => {
      this.profServ.getProf(resp.login).subscribe((res) => {
        if(this.data == undefined){
          this.profServ.addAula({
            nome: aula.aula,
            inicio_Aula: aula.inicioAula,
            duracao_Min: 75,
            profId_FK: res.funcionarioId,
            salaId_FK: aula.sala
          }).subscribe(r => {
            aula.alunos.forEach(element => {
              console.log(element)
            });
            setTimeout(() => {
              this.dialogRef.close()
            }, 500);
          });
        }
        else{
          this.profServ.updateAula({
            nome: aula.aula,
            inicio_Aula: aula.inicioAula,
            duracao_Min: 75,
            profId_FK: res.funcionarioId,
            salaId_FK: aula.sala,
            aulaId: this.data.aula.aulaId
          }).subscribe(resp => {
            setTimeout(() => {
              this.dialogRef.close()
            }, 500);
          })
        }
      });
    });
  }

  verificarMatricula(aluno){
    let al = this.data.alunos.filter(e => {
      return e.alunoId === aluno.alunoId;
    });

    if(al.length > 0){
      this.selectedAlunos.push(al[0].alunoId)
    }
  }
}
