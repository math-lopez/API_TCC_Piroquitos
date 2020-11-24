import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { AulasComponent } from '../../aluno/aulas/aulas.component';
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
  fixCharDay: any = '';
  fixCharMonth: any = '';
  fixCharHour: any = '';
  fixCharMinutes: any = '';
  selectedAlunos = [];
  subscription: Subscription[] = []

  constructor(
    public dialogRef: MatDialogRef<AddAulaComponent>,
    private formBuilder: FormBuilder,
    private authServ: AuthService,
    private profServ: ProfService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.profServ.getSalas().subscribe((resp) => {
        this.salas = resp;
      })
    );

    this.subscription.push(
    this.profServ.getAlunos().subscribe((resp) => {
      this.alunosCadastrados = resp;
      if (this.data) {
        this.alunosCadastrados.forEach((e) => {
          this.verificarMatricula(e);
        });
      }
    }));

    if (this.data) {
      var dataUpdate = new Date(this.data.aula.inicio_Aula);
      this.modeEdit = true;
      if (dataUpdate.getDate() <= 9) {
        this.fixCharDay = '0';
      }
      if((dataUpdate.getMonth()+1) <= 9){
        this.fixCharMonth = '0';
      }
      if(dataUpdate.getHours() <= 9){
        this.fixCharHour = '0';
      }
      if(dataUpdate.getMinutes() <= 9){
        this.fixCharMinutes = '0';
      }
    }

    this.subscription.push(
    this.authServ.users.subscribe((resp) => {
      this.alunosCadastrados = resp;
    }));

    this.cadAula = this.formBuilder.group({
      aula: [
        this.data != undefined ? this.data.aula.nome : null,
        [Validators.required],
      ],
      inicioAula: [
        this.data != undefined
          ? dataUpdate.getFullYear() +
            '-' + 
            this.fixCharMonth +
            (dataUpdate.getMonth()+1) +
            '-' +
            this.fixCharDay +
            dataUpdate.getDate() +
            'T' +
            this.fixCharHour +
            dataUpdate.getHours() +
            ':' +
            this.fixCharMinutes +
            dataUpdate.getMinutes()
          : null,
        [Validators.required],
      ],
      sala: [
        this.data?.aula.salaId_FK != undefined
          ? this.data?.aula.salaId_FK
          : null,
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
    this.subscription.push(
    this.authServ.usuario.subscribe((resp) => {
      this.subscription.push(
      this.profServ.getProf(resp.login).subscribe((res) => {
        if (this.data == null) {
          this.profServ
            .addAula({
              nome: aula.aula,
              inicio_Aula: aula.inicioAula,
              duracao_Min: 75,
              profId_FK: res.funcionarioId,
              salaId_FK: aula.sala,
            })
            .subscribe((r) => {
              aula.alunos.forEach((e) => {
                this.profServ
                  .addAluno({ alunoId_FK: e, aulaId_FK: r.aulaId })
                  .subscribe((result) => {});
              });
              setTimeout(() => {
                this.dialogRef.close();
              }, 500);
            });
        } else {
          this.subscription.push(
          this.profServ
            .updateAula({
              nome: aula.aula,
              inicio_Aula: aula.inicioAula,
              duracao_Min: 75,
              profId_FK: res.funcionarioId,
              salaId_FK: aula.sala,
              aulaId: this.data.aula.aulaId,
            })
            .subscribe((r) => {
              if (this.selectedAlunos.length > 0) {
                let alunosAntigos = this.selectedAlunos.filter((s) => {
                  if (!aula.alunos.includes(s)) {
                    return true;
                  } else {
                    return false;
                  }
                });

                let alunosNovos = aula.alunos.filter((s) => {
                  if (!this.selectedAlunos.includes(s)) {
                    return true;
                  } else {
                    return false;
                  }
                });

                alunosAntigos.forEach((alAntigo) => {
                  this.subscription.push(
                  this.profServ
                    .removeAlunoAula(alAntigo, this.data.aula.aulaId)
                    .subscribe((r) => {}))
                });

                alunosNovos.forEach((alNovo) => {
                  this.subscription.push(
                  this.profServ
                    .addAluno({
                      alunoId_FK: alNovo,
                      aulaId_FK: this.data.aula.aulaId,
                    })
                    .subscribe((result) => {}));
                });
                
              } else {
                aula.alunos.forEach((e) => {
                  this.profServ
                    .addAluno({
                      alunoId_FK: e,
                      aulaId_FK: this.data.aula.aulaId,
                    })
                    .subscribe((result) => {});
                });
              }
              setTimeout(() => {
                this.dialogRef.close();
              }, 500);
            }))
        }
      }))
    })
    );
  }

  verificarMatricula(aluno) {
    let al = this.data.alunos.filter((e) => {
      return e.alunoId === aluno.alunoId;
    });

    if (al.length > 0) {
      this.selectedAlunos.push(al[0].alunoId);
    }
  }

  ngOnDestroy(): void {
    this.data == null;
    this.subscription.forEach(e => {
      e.unsubscribe()
    })
  }
}
