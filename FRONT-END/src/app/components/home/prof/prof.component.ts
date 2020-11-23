import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  profAula: ProfAula[] = [];
  aulaActive: any;
  dateAtual = new Date();
  modeEdit: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['aula', 'qtdAlunos', 'dataAula', 'opcoes'];
  constructor(
    public dialog: MatDialog,
    private profServ: ProfService,
    private authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.authServ.usuario.subscribe((resp) => {
      this.profServ.getProf(resp.login).subscribe((res) => {
        this.profServ.getAulas(res).subscribe(async (re) => {
          let teste = await this.addAlunosAula(re);
          setTimeout(() => {
            console.log(this.profAula)
            this.dataSource = new MatTableDataSource(this.profAula);
          }, 500) 
        });
      });
    });
    this.dataSource = new MatTableDataSource(this.profAula);
    // this.getAulas();
  }

  addAlunosAula(re){
    re.forEach((element) => {
      this.profServ
        .getAlunosPorAula(element.profId_FK, element.aulaId)
        .subscribe((r) => {
          console.log(r);
          this.profAula.push({
            aula: element,
            alunos: r,
          });
        });
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editStudent(aula) {
    var timeAula = new Date(aula.dataAula);
    if (this.dateAtual.getTime() >= timeAula.getTime()) {
      this.modeEdit = true;
      this.aulaActive = aula;
    }
  }

  getAulas() {
    this.profServ.getAulas(1).subscribe((resp) => {});

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 200);
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

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  updateAula(aula) {
    this.dialog.open(AddAulaComponent, {
      data: aula,
    });
  }

  deleteAula(aula) {
    const dialogRef = this.dialog.open(DialogConfirmMudancaPresencaComponent, {
      data: 'deseja excluir esta aula?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  initAula(row) {
    console.log(row);
  }
}
