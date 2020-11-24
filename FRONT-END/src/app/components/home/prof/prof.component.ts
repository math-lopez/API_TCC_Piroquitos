import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { time } from 'console';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { AddAulaComponent } from './add-aula/add-aula.component';
import { DialogConfirmMudancaPresencaComponent } from './dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';
import { ProfService } from './prof.service';

export interface ProfAula {
  aula: any;
  alunos: any;
}
@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss'],
})
export class ProfComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription[] = []
  profAula: ProfAula[] = [];
  aulaActive: any;
  dateAtual = new Date();
  modeEdit: boolean = false;
  dataSource: MatTableDataSource<any>;
  iniciarAula = true;
  displayedColumns: string[] = ['aula', 'qtdAlunos', 'dataAula', 'opcoes'];
  constructor(
    public dialog: MatDialog,
    private profServ: ProfService,
    private authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.profAula);
    this.getAulas();
  }

  addAlunosAula(re) {
    re.forEach((element) => {
      this.profServ
        .getAlunosPorAula(element.profId_FK, element.aulaId)
        .subscribe((r) => {
          this.profAula.push({
            aula: element,
            alunos: r,
          });
        });
    });
  }
  ngAfterViewInit(): void {}

  checkInit(row){
    let retorno = false;
    if(row.alunos.length > 0){
      for (let i = 0; i < row.alunos.length; i++){
        if(row.alunos[i].presenca == 1 || row.alunos[i].presenca == 0){
          return true;
        }
      }
    }
    return false
  }

  editStudent(aula) {
    var timeAula = new Date(aula.aula.inicio_Aula);
    if (this.dateAtual.getTime() >= timeAula.getTime()) {
      this.modeEdit = true;
      this.aulaActive = aula;
    }
  }

  getAulas() {
    this.profAula = [];
    this.subscription.push(
    this.authServ.usuario.subscribe((resp) => {
      this.subscription.push(
      this.profServ.getProf(resp.login).subscribe((res) => {
        this.subscription.push(
        this.profServ.getAulas(res).subscribe((re) => {
          this.addAlunosAula(re);
          this.dataSource = new MatTableDataSource([]);
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.profAula);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 500);
        }, error => {}))
      }))
    }));
  }

  onBack(event) {
    this.modeEdit = event;
    this.dataSource = new MatTableDataSource();
    this.getAulas();
  }

  openDialogAddAula() {
    const dialogRef = this.dialog.open(AddAulaComponent, {
      width: '50%',
    });

    this.subscription.push(
    dialogRef.afterClosed().subscribe((result) => {
      this.getAulas();
    }))
  }

  updateAula(aula) {
    const dialogRef = this.dialog.open(AddAulaComponent, {
      data: aula,
    });

    this.subscription.push(
    dialogRef.afterClosed().subscribe(result => {
      this.getAulas();
    }))
  }

  deleteAula(aula) {
    const dialogRef = this.dialog.open(DialogConfirmMudancaPresencaComponent, {
      data: 'deseja excluir esta aula?',
    });
    this.subscription.push(
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.subscription.push(
        this.profServ.deleteAula(aula.aula.aulaId)
        .subscribe(resp => {
          this.getAulas();
        }))
      }
    }))
  }

  initAula(row) {
    this.subscription.push(
    this.profServ.iniciarAula(row.aula.aulaId).subscribe(resp => {
      setTimeout(() => {
        this.getAulas();
      }, 5500);
    })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => e.unsubscribe())
  }
}
