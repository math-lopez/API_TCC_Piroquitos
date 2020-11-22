import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';
import { AddAulaComponent } from './add-aula/add-aula.component';
import { DialogConfirmMudancaPresencaComponent } from './dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss'],
})
export class ProfComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  aulaActive: any;
  dateAtual = new Date();
  modeEdit: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['aula', 'qtdAlunos', 'dataAula', 'opcoes'];
  constructor(private authServ: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAulas();
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
    this.authServ.aulas.subscribe((aulas) => {
      this.dataSource = new MatTableDataSource(aulas);
    });

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

  initAula(row){
    console.log(row);
  }
}