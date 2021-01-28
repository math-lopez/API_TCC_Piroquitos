import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/shared/auth.service';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.scss']
})
export class AulasComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user: User;
  displayedColumns: string[] = ['aula', 'responsavel', 'horario'];
  dataSource: MatTableDataSource<any>;
  
  constructor(private alunoServ: AlunoService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.authServ.usuario.subscribe(resp => {
      this.user = resp;
      this.alunoServ.getAulas(this.user.login);
    });
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "itens por página";
  }

}
