import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';
import { DialogConfirmMudancaPresencaComponent } from '../../../prof/dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';

@Component({
  selector: 'app-show-alunos',
  templateUrl: './show-alunos.component.html',
  styleUrls: ['./show-alunos.component.scss']
})
export class ShowAlunosComponent implements OnInit {

  userActive: any;
  modeEdit: boolean = false;
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'opcoes'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private authServ: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authServ.users.subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  editStudent(student){
    console.log(student)
    this.modeEdit = true;
    this.userActive = student;
  }

  onBack(event){
    this.modeEdit = event;
  }

  deleteAula(aula){
    const dialogRef = this.dialog.open(DialogConfirmMudancaPresencaComponent, {
      data: 'deseja excluir este usuário?'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
