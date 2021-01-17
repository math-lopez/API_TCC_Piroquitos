import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { DialogConfirmMudancaPresencaComponent } from '../../../prof/dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';
import { SecretariaService } from '../../secretaria.service';

@Component({
  selector: 'app-show-alunos',
  templateUrl: './show-alunos.component.html',
  styleUrls: ['./show-alunos.component.scss'],
})
export class ShowAlunosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users = [];
  userActive: any;
  modeEdit: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'opcoes'];

  constructor(private authServ: AuthService, public dialog: MatDialog, private secServ: SecretariaService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.users = [];
    this.dataSource = new MatTableDataSource([]);
    let alunos = this.secServ.getAllAlunos();
    let funcionarios = this.secServ.getAllFunc();

    forkJoin([alunos, funcionarios]).pipe(
      map(resp => {
        resp[0].forEach(e => {
          this.users.push(
            {
              funcRA: e.RA,
              nome: e.nome,
              tipo: e.tipo,
              alunoId: e.alunoId,
              login: e.login
            }
          )
        });
        resp[1].forEach(e => {
          this.users.push(
            {
              funcRA: e.funcional,
              nome: e.nome,
              tipo: e.tipo,
              funcionarioId: e.funcionarioId,
              login: e.login
            }
          )
        });
      })
    ).subscribe(re => {
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 300);
    });

    
  }

  editStudent(student) {
    this.modeEdit = true;
    this.userActive = student;
  }

  onBack(event) {
    this.modeEdit = event;
    this.getUsers();
  }

  deleteAula(aula) {
    const dialogRef = this.dialog.open(DialogConfirmMudancaPresencaComponent, {
      data: 'deseja excluir este usuário?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        if(aula.tipo === 'aluno'){
          this.secServ.removeAluno(aula.alunoId).subscribe(re => {
            this.secServ.removeUser({login: aula.login}).subscribe(r => {
              this.getUsers();
            });
          });
        }
        else{
          this.secServ.removeFunc(aula.funcionarioId).subscribe(re => {
            this.secServ.removeUser({login: aula.login}).subscribe(r => {
              this.getUsers();
            });
          });
        }
      }
    });
  }
}
